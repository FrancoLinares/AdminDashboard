'use client';
import React, { useMemo, useState } from 'react';
import SearchSelectItemCustom from '@/components/UI/SearchSelectItem';
import TextInputCustom from '@/components/UI/TextInput';
import useSelect from 'hooks/useSelect';
import { useFetch } from 'hooks/useFetch';
import { API_INTERNAL_URLS } from '@/server/urls';
import { Partnership } from '@/types/shared';
import {
  TITLE_PLACEHOLDER,
  TITLE_SELECT_HELPER_TEXT,
  TITLE_LABEL,
  TEXTAREA_LABEL,
  TEXTAREA_PLACEHOLDER,
  ERROR_VALIDATION,
  ERROR_CREATE_REQ,
  SUCCESS_CREATE_NEWS
} from './constants';
import useUIElement from 'hooks/useTextInput';
import TextAreaCustom from '@/components/UI/TextArea';
import { Button } from '@tremor/react';
import { isValidPartnership } from 'utils/partnership';
import { hasMoreThanXCharacters } from 'utils/shared';
import { toast } from 'sonner';
import { makeRequest } from 'utils/request';
import { News } from '@/types/news';
import { addError } from '../utils';

type Props = {};

const MobileNotificationForm = (props: Props) => {
  const { value: selectedPartnership, handleChange: handleChangePartnership } =
    useSelect();
  const { value: titleValue, handleChange: handleChangeTitle } = useUIElement();
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

  // Handlers
  const onChangePartnershipSelect = (value: string) => {
    handleChangePartnership(value);
    setErrors((prevState) => ({
      ...prevState,
      partnership: false
    }));
  };
  const onChangeTitle = (value: string) => {
    handleChangeTitle(value);
    setErrors((prevState) => ({
      ...prevState,
      title: false
    }));
  };
  const onChangeContent = (value: string) => {
    handleChangeContent(value);
    setErrors((prevState) => ({
      ...prevState,
      content: false
    }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate data

    // Verify fields are not empty
    const [isPartnershipIdEmpty, isTitleEmpty, isContentEmpty] = [
      selectedPartnership,
      titleValue,
      contentValue
    ].map((field) => {
      return !Boolean(field?.trim());
    });

    // Valid partnershipId
    const isInValidPartnershipId =
      !isValidPartnership(partnerships, selectedPartnership as string) ||
      Boolean(selectedPartnership === '0');

    // Errors title, content - no more than X characters
    const [hasTitleMoreThanXChars, hasContentMoreThanXChars] = [
      hasMoreThanXCharacters(titleValue, 30),
      hasMoreThanXCharacters(contentValue, 250)
    ];

    // Array of errors
    const errors = [
      isPartnershipIdEmpty,
      isTitleEmpty,
      isContentEmpty,
      isInValidPartnershipId,
      hasTitleMoreThanXChars,
      hasContentMoreThanXChars
    ].filter((error) => Boolean(error));
    if (errors.length) {
      // Errors too long
      if (hasTitleMoreThanXChars || hasContentMoreThanXChars) {
        setErrors((prevState) => ({
          ...prevState,
          title: hasTitleMoreThanXChars && ERROR_VALIDATION.TITLE_TOO_LONG,
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
      if (isPartnershipIdEmpty || isTitleEmpty || isContentEmpty) {
        setErrors((prevState) => ({
          ...prevState,
          title: addError(
            isTitleEmpty,
            prevState?.title,
            ERROR_VALIDATION.REQUIRED
          ),
          content: addError(
            isContentEmpty,
            prevState?.content,
            ERROR_VALIDATION.REQUIRED
          ),
          partnership: addError(
            isPartnershipIdEmpty,
            prevState?.partnership,
            ERROR_VALIDATION.REQUIRED
          )
        }));
      }

      // show error toast
      return toast.error(ERROR_VALIDATION.TOAST);
    }

    // Request API here
    try {
      const newsCreated = await makeRequest<News>({
        url: API_INTERNAL_URLS.ADD_NEWS,
        method: 'POST',
        body: {
          partnershipId: selectedPartnership,
          title: titleValue,
          content: contentValue
        }
      });

      toast.success(SUCCESS_CREATE_NEWS);

      // Reset form
      handleChangePartnership(undefined);
      handleChangeTitle('');
      handleChangeContent('');
    } catch (err) {
      toast.error(ERROR_CREATE_REQ);
    }
  };

  return (
    <>
      <div className="max-w-lg space-y-10 mx-auto">
        <SearchSelectItemCustom
          id="search-select-partnership"
          label="Selecione una consorcio"
          placeholder={'Seleccione un consorcio'}
          options={partnershipsOptions}
          value={selectedPartnership}
          handleChange={onChangePartnershipSelect}
          helperText={TITLE_SELECT_HELPER_TEXT}
          errorMessage={errors?.partnership}
        />
        <TextInputCustom
          value={titleValue}
          label={TITLE_LABEL}
          placeholder={TITLE_PLACEHOLDER}
          handleChange={onChangeTitle}
          errorMessage={errors?.title}
        />
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
    </>
  );
};

export default MobileNotificationForm;
