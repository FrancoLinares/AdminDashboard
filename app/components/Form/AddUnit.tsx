'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import SelectCustom from '@/UI/Select';
import { Button } from '@tremor/react';
import { Partnership } from '@/types/shared';
import { UnitFromTECO } from '@/types/user';
import useSelect from 'hooks/useSelect';
import { ADD_UNIT_ERROR, ADD_UNIT_SUCCESS } from './constants';
import { useSharedDataContext } from 'providers/SharedDataProvider';
import { useModalContext } from 'providers/ModalProvider';

const FormAddUnit = () => {
  const [partnerships, setPartnerships] = useState<Partnership[] | null>(null);
  const [units, setUnits] = useState<UnitFromTECO[] | null>(null);
  const { value: selectedPartnership, handleChange: handleChangePartnership } =
    useSelect();
  const { value: selectedUnit, handleChange: handleChangeUnit } = useSelect();
  const [isLoadingForm, setLoadingForm] = useState<boolean>(false);
  const { toggle } = useModalContext();

  const { user, setUnitsByUserId } = useSharedDataContext();

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
      setLoadingForm(true);

      // Errors
      if (!selectedPartnership)
        formik.setFieldError(
          'partnership',
          'Consorcio Functional es requerido'
        );
      if (!selectedUnit)
        formik.setFieldError('unit', 'Unidad Functional es requerido');
      if (!user?._id) toast.error(ADD_UNIT_ERROR);

      if (!selectedPartnership || !selectedUnit || !user?._id) {
        setLoadingForm(false);
        return;
      }

      // Success
      const data: { unitId: number; userId: string } = {
        unitId: Number(selectedUnit),
        userId: user._id
      };

      fetch('/api/teco?type=addUnit', {
        method: 'POST',
        body: JSON.stringify(data)
      })
        .then((resp) => resp.json())
        .then((user) => {
          toast.success(ADD_UNIT_SUCCESS);

          setUnitsByUserId((prevState) => [...prevState, user]);
        })
        .catch((err) => {
          toast.error(ADD_UNIT_ERROR);
        })
        .finally(() => {
          setLoadingForm(false);
          toggle();
        });
    }
  }) as any;

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
          <Button variant="primary" loading={isLoadingForm} type="submit">
            Agregar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormAddUnit;
