"use client";

import InputField from "@/components/InputField";
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { ZipCodeMask, removeMask } from "@/utils/masks";
import { useCep } from '@/hooks/zipCode';

export default function Step3() {
  const { register, setValue, watch, formState: { errors }, clearErrors } = useFormContext();
  const zipCode = watch("address.zipCode");

  // Remove a máscara do CEP antes de usar
  const rawZipCode = removeMask(zipCode);

  // Usa o hook personalizado para buscar o endereço
  const { data: address, isError } = useCep(rawZipCode);

  const getNestedError = (errors: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc?.[part], errors)?.message ?? "";
  };


  // Atualiza os campos do formulário quando o endereço é retornado
  useEffect(() => {
    if (address && !address.erro) {
      setValue("address.streetAddress", address.logradouro);
      setValue("address.neighborhood", address.bairro);
      setValue("address.city", address.localidade);
      setValue("address.state", address.uf);

      // Limpa os erros dos campos preenchidos pela API
      clearErrors(["address.streetAddress", "address.city", "address.state"]);
    } else if (isError) {
      alert("Erro ao buscar o CEP. Preencha os campos manualmente.");
    }
  }, [address, isError, setValue, clearErrors]);

  return (
    <div className="flex flex-col w-full">
      <InputField
        label="CEP"
        placeholder="Digite o CEP do local do evento"
        register={register("address.zipCode", {
          required: "CEP é obrigatório",
          validate: (value) => {
            const rawValue = removeMask(value);
            return rawValue.length === 8 || "CEP inválido";
          },
        })}
        mask={ZipCodeMask}
        error={getNestedError(errors, "address.zipCode")}
      />

      <InputField
        label="Logradouro"
        description="Nome da rua, avenida, etc."
        placeholder="Digite o logradouro do local do evento"
        register={
          {
            ...register("address.streetAddress", {
              required: "Logradouro é obrigatório",
            })
          }
        }
        error={getNestedError(errors, "address.streetAddress")}
      />

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <InputField
            label="Bloco/Apto"
            placeholder="Digite o bloco/apto do local do evento"
            register={
              {
                ...register("address.addressLine2")
              }
            }
            error={getNestedError(errors, "address.addressLine2")}
          />
        </div>

        <div className="col-span-1">
          <InputField
            label="Número"
            placeholder="000"
            type="number"
            register={
              {
                ...register("address.streetNumber", {
                  required: "Número é obrigatório",
                })
              }
            }
            error={getNestedError(errors, "address.streetNumber")}
          />
        </div>
      </div>

      <InputField
        label="Bairro"
        placeholder="Digite o bairro do local do evento"
        register={
          {
            ...register("address.neighborhood", {
              required: "Bairro é obrigatório",
            })
          }
        }
        error={getNestedError(errors, "address.neighborhood")}
      />

      <div className="flex gap-4">
        <div className="flex-1">
          <InputField
            label="Cidade"
            placeholder="Digite a cidade do local do evento"
            register={
              {
                ...register("address.city", {
                  required: "Cidade é obrigatória",
                })
              }
            }
            error={getNestedError(errors, "address.city")}
          />
        </div>
        <div className="flex-1">
          <InputField
            label="Estado"
            placeholder="Digite o estado do local do evento"
            register={
              {
                ...register("address.state", {
                  required: "Estado é obrigatório",
                })
              }
            }
            error={getNestedError(errors, "address.state")}
          />
        </div>
      </div>
    </div>
  );
}