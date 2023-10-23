import { useForm, Controller } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import logoDexco from '../images/dexco-logo.png'
import { CalendarDate } from '@internationalized/date';

import * as hooks from "../hooks"
import { useFilterContext } from "../contexts/filter"
import { DateRangePicker } from '@adobe/react-spectrum'

import { INITIAL_PERIOD } from "../constants";

import * as S from './Filter.style'

const CalendarDateSchema = zod.instanceof(CalendarDate);

const schema = zod.object({
  unit: zod.object({
    label: zod.string(),
    value: zod.number()
  }, {
    required_error: 'Campo obrigatório'
  }),
  linesProduction: zod.array(zod.object({
    label: zod.string(),
    value: zod.number()
  }), {
    required_error: 'Campo obrigatório'
  }),
  linesChoice: zod.array(zod.object({
    label: zod.string(),
    value: zod.number()
  }), {
    required_error: 'Campo obrigatório'
  }),
  period: zod.object({
    start: CalendarDateSchema,
    end: CalendarDateSchema
  }, {
    invalid_type_error: 'Período de datas inválidas'
  })
})

export type SchemaFilter = zod.infer<typeof schema>

export function FilterPage() {
  const { onChangeFilter } = useFilterContext()

  const methods = useForm<SchemaFilter>({
    defaultValues: {
      linesChoice: undefined,
      linesProduction: undefined,
      period: INITIAL_PERIOD,
      unit: undefined
    },
    resolver: zodResolver(schema)
  })

  const queryUnit = hooks.useQueryUnit()

  const mutationLineProduction = hooks.useMutationLineProduction(
    () => methods.resetField('linesProduction')
  )

  const mutationLineChoice = hooks.useMutationLineChoice(
    () => methods.resetField('linesChoice')
  )

  function handleNewFilter(data: SchemaFilter) {
    onChangeFilter(data)
  }

  return (
    <S.Wrapper>
      <S.Image src={logoDexco} />

      <S.Form onSubmit={methods.handleSubmit(handleNewFilter)}>
        {methods.formState.errors['unit'] && (
          <S.MessageError> {methods.formState.errors['unit'].message} </S.MessageError>
        )}

        <Controller
          name="unit"
          control={methods.control}
          render={({ field }) => (
            <S.Select
              ref={field.ref}
              value={field.value}
              options={queryUnit.data}
              onChange={(props: any) => (
                field.onChange(props),
                mutationLineProduction.mutate(props?.value),
                mutationLineChoice.mutate(props?.value)
              )}
              placeholder='Selecione uma unidade'
              isSearchable={false}
              isDisabled={!queryUnit.isSuccess}
              isLoading={queryUnit.isLoading}
            />
          )}
        />

        {methods.formState.errors['linesProduction'] && (
          <S.MessageError> {methods.formState.errors['linesProduction'].message} </S.MessageError>
        )}
        <Controller
          name="linesProduction"
          control={methods.control}
          render={({ field }) => (
            <S.Select
              ref={field.ref}
              options={mutationLineProduction.data}
              value={field.value}
              onChange={(props: any) => {
                !!props.length ? field.onChange(props) : field.onChange(undefined)
              }}
              placeholder='Selecione linhas de produção'
              isSearchable={false}
              isDisabled={!mutationLineProduction.isSuccess}
              isLoading={mutationLineProduction.isLoading}
              isMulti={true}
            />
          )}
        />

        {methods.formState.errors['linesChoice'] && (
          <S.MessageError> {methods.formState.errors['linesChoice'].message} </S.MessageError>
        )}
        <Controller
          name="linesChoice"
          control={methods.control}
          render={({ field }) => (
            <S.Select
              ref={field.ref}
              options={mutationLineChoice.data}
              value={field.value}
              onChange={(props: any) => {
                !!props.length ? field.onChange(props) : field.onChange(undefined)
              }}
              placeholder='Selecione linhas de escolha'
              isSearchable={false}
              isDisabled={!mutationLineChoice.isSuccess}
              isLoading={mutationLineChoice.isLoading}
              isMulti={true}
            />
          )}
        />

        {methods.formState.errors['period'] && (
          <S.MessageError> {methods.formState.errors['period'].message} </S.MessageError>
        )}

        <Controller
          name='period'
          control={methods.control}
          render={({ field }) => (
            <DateRangePicker
              width={{
                base: 'auto',
                L: '18.25rem'
              }}
              value={field.value}
              onChange={field.onChange}
              label="Período de pesquisa"
              errorMessage='Data Inválida'
              isRequired
            />
          )}
        />

        <S.ButtonSubmit> Salvar </S.ButtonSubmit>
      </S.Form>
    </S.Wrapper>
  )
}



