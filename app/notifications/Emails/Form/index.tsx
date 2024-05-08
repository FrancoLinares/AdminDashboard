'use client';
import { Button, MultiSelect, MultiSelectItem } from '@tremor/react';
import { API_INTERNAL_URLS } from '@/server/urls';
import { Partnership } from '@/types/shared';
import { useFetch } from 'hooks/useFetch';
import React, { useEffect, useMemo, useState } from 'react';
import TextAreaCustom from '@/components/UI/TextArea';
import {
  CREATE_EMAIL_SUCCESS,
  TEXTAREA_LABEL,
  TEXTAREA_PLACEHOLDER
} from './constants';
import useSelect from 'hooks/useSelect';
import useUIElement from 'hooks/useTextInput';
import { isValidPartnership } from 'utils/partnership';
import { hasMoreThanXCharacters } from 'utils/shared';
import {
  ERROR_CREATE_REQ,
  ERROR_VALIDATION
} from 'notifications/News/Form/constants';
import { addError } from 'notifications/News/utils';
import { toast } from 'sonner';
import { makeRequest } from 'utils/request';
import { useAuth } from 'hooks/useAuth';

export default function EmailForm() {
  const { value: selectedPartnerships, handleChange: handleChangePartnership } =
    useSelect<string[]>();
  const { value: contentValue, handleChange: handleChangeContent } =
    useUIElement();
  const [errors, setErrors] = useState<
    | {
        title?: string | false;
        content?: string | false;
        partnership?: string | false;
      }
    | undefined
  >();
  const { session } = useAuth();
  console.log('🚀 ~ EmailForm ~ session:', session);

  const { data: partnerships = [] } = useFetch<Partnership[]>(
    API_INTERNAL_URLS.GET_PARTNERSHIPS
  );

  const partnershipsOptions =
    useMemo(() => {
      const partnershipsOptions = partnerships?.map((partnership) => ({
        value: `${partnership.id}`,
        label: `( ${partnership.number} ) ${partnership.name}`
      }));

      if (partnershipsOptions.length) {
        partnershipsOptions.unshift({
          value: '0',
          label: 'TODOS LOS CONSORCIOS'
        });
      }

      return partnershipsOptions;
    }, [partnerships]) || [];
  console.log('🚀 ~ EmailForm ~ partnershipsOptions:', partnershipsOptions);

  const onSelectChange = (partnershipsIds: string[]) => {
    handleChangePartnership(partnershipsIds);
    setErrors((prevState) => ({
      ...prevState,
      partnership: false
    }));
  };

  const onChangeContent = (value: string) => {
    handleChangeContent(value);
    setErrors((prevState) => ({
      ...prevState,
      content: false
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate data

    // Verify fields are not empty
    const [isContentEmpty] = [contentValue].map((field) => {
      return !Boolean(field?.trim());
    });

    // Valid partnershipId
    const isInValidPartnershipId = selectedPartnerships?.every(
      (selectedPartnership) =>
        !isValidPartnership(partnerships, selectedPartnership as string) ||
        Boolean(selectedPartnership === '0')
    );
    console.log(
      '🚀 ~ handleSubmit ~ isInValidPartnershipId:',
      isInValidPartnershipId
    );

    // Errors title, content - no more than X characters
    const hasContentMoreThanXChars = hasMoreThanXCharacters(contentValue, 600);

    // Array of errors
    const errors = [
      isContentEmpty,
      isInValidPartnershipId,
      hasContentMoreThanXChars
    ].filter((error) => Boolean(error));
    if (errors.length) {
      // Errors too long
      if (hasContentMoreThanXChars) {
        setErrors((prevState) => ({
          ...prevState,
          content: hasContentMoreThanXChars && ERROR_VALIDATION.TEXT_TOO_LONG
        }));
      }

      // Invalid partnership
      if (isInValidPartnershipId) {
        setErrors((prevState) => ({
          ...prevState,
          partnership: ERROR_VALIDATION.PARTNERSHIP_INVALID
        }));
      }

      // Empty errors
      if (isContentEmpty) {
        setErrors((prevState) => ({
          ...prevState,
          content: addError(
            isContentEmpty,
            prevState?.content,
            ERROR_VALIDATION.REQUIRED
          )
        }));
      }

      // show error toast
      return toast.error(ERROR_VALIDATION.TOAST);
    }

    // Request API here
    try {
      await makeRequest({
        url: API_INTERNAL_URLS.CREATE_EMAIL,
        method: 'POST',
        body: {
          partnership_ids: selectedPartnerships,
          admin_name: session?.user?.name,
          msg_content: contentValue
        }
      });

      toast.success(CREATE_EMAIL_SUCCESS);

      // Reset form
      handleChangePartnership([]);
      handleChangeContent('');
      setErrors(undefined);
    } catch (err) {
      toast.error(ERROR_CREATE_REQ);
    }
  };

  useEffect(() => {
    console.log('selectedPartnerships', selectedPartnerships);
  }, [selectedPartnerships]);

  return (
    <div className="max-w-lg space-y-10 mx-auto">
      <MultiSelect onValueChange={onSelectChange}>
        {partnershipsOptions.map((partnership) => (
          <MultiSelectItem key={partnership.value} value={partnership.value}>
            {partnership.label}
          </MultiSelectItem>
        ))}
      </MultiSelect>
      <TextAreaCustom
        value={contentValue}
        label={TEXTAREA_LABEL}
        placeholder={TEXTAREA_PLACEHOLDER}
        handleChange={onChangeContent}
        errorMessage={errors?.content}
        className="min-h-60"
      />

      <Button variant="primary" loading={false} onClick={handleSubmit}>
        Enviar
      </Button>
    </div>
  );
}
