'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import SelectCustom from '@/UI/Select';
import { Button } from '@tremor/react';
import { Partnership } from '@/types/shared';
import { UnitFromTECO } from '@/types/user';
import useSelect from 'hooks/useSelect';

const validationSchema = yup.object({
  unit: yup.string().required('Unidad Funcional es requerido'),
  partnership: yup.string().required('Consorcio es requerido')
});

type Props = {
  onCancel: (e: React.MouseEvent<HTMLElement>) => void;
};

const FormAddUnit = ({ onCancel }: Props) => {
  const [partnerships, setPartnerships] = useState<Partnership[] | null>(null);
  const [units, setUnits] = useState<UnitFromTECO[] | null>(null);
  const { value: selectedPartnership, handleChange: handleChangePartnership } =
    useSelect();
  const { value: selectedUnit, handleChange: handleChangeUnit } = useSelect();

  const handleChangePartnershipFormik = (value: string) => {
    formik.setFieldError('partnership', '');
    handleChangePartnership(value);
  };
  const handleChangeUnitFormik = (value: string) => {
    formik.setFieldError('unit', '');
    handleChangeUnit(value);
  };

  useEffect(() => {
    fetch('/api/teco?type=partnerships')
      .then((resp) => resp.json())
      .then((partnerships) => {
        setPartnerships(partnerships || []);
      });
  }, []);

  const [unitsLoading, setUnitsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedPartnership) {
      setUnitsLoading(true);
      fetch(`/api/teco?type=units&id=${selectedPartnership}`)
        .then((resp) => resp.json())
        .then((units) => {
          setUnits(units || []);
          setUnitsLoading(false);
        });
    }
  }, [selectedPartnership]);

  const formik = useFormik({
    initialValues: {
      partnership: '',
      unit: ''
    },
    onSubmit: async () => {
      formik.setSubmitting(true);
      console.log('selectedPartnership', selectedPartnership);
      console.log('selectedUnit', selectedUnit);
      // Errors
      if (!selectedPartnership)
        formik.setFieldError(
          'partnership',
          'Consorcio Functional es requerido'
        );
      if (!selectedUnit)
        formik.setFieldError('unit', 'Unidad Functional es requerido');

      // Success
      fetch('/api/teco?type=addUnit', {
        method: 'POST'
      })
        .then((resp) => resp.json())
        .then((response) => {
          // TODO: Create an success toast
          console.log('response', response);
          formik.setSubmitting(false);
          formik.resetForm();
        })
        .catch((err) => {
          // TODO: Create an error toast
          console.log('err', err);
        });
    }
  });

  const partnershipsOptions =
    useMemo(
      () =>
        partnerships?.map((partnership) => {
          return {
            label: `${partnership.name} - ${partnership.number}`,
            value: `${partnership.id}`
          };
        }),
      [partnerships]
    ) || [];

  const unitsOptions =
    useMemo(
      () =>
        units?.map((unit) => {
          return {
            label: `UF: ${unit.unit} // ${unit.floor} - ${unit.department} // ${unit.name?.substring(0, 10)}...`,
            value: `${unit.id}`
          };
        }),
      [units]
    ) || [];

  return (
    <div className="xl:container xl:mx-auto overscroll-contain">
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto max-w-lg mt-10 z-10">
          <SelectCustom
            id="partnership"
            label="Selecione un Consorcio"
            placeholder={'E.j: Av.Siempre Viva 123'}
            options={partnershipsOptions}
            value={selectedPartnership}
            handleChange={handleChangePartnershipFormik}
            errorMessage={
              formik.touched.partnership && formik.errors.partnership
            }
          />
        </div>
        <div className="mx-auto max-w-lg mt-0 mb-20">
          <SelectCustom
            id="unit"
            label="Selecione una unidad"
            placeholder={unitsLoading ? 'Cargando...' : 'Eligir unidad'}
            options={unitsOptions}
            value={selectedUnit}
            handleChange={handleChangeUnitFormik}
            errorMessage={formik.touched.unit && formik.errors.unit}
          />
        </div>
        <div className="flex justify-center mt-20 mb-20">
          <Button variant="primary" loading={formik.isSubmitting} type="submit">
            Agregar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormAddUnit;
