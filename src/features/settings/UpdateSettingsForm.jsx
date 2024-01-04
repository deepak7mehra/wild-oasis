import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';
import Spinner from "../../ui/Spinner"

function UpdateSettingsForm() {
  const {isLoading, settings:{
    minBookingLength,
    maxBookingLength,
    maxGuestPerBooking,
    breakfastPrice,
  }={}} = useSettings();

  const {isUpdating,updateSetting} = useUpdateSetting();

  if (isLoading) return<Spinner/>

  function handleUpdate(e,field){
    const {value} = e.target;
    if (!value) return;
    updateSetting({[field]:value})
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input disabled = {isUpdating} onBlur={(e)=>handleUpdate(e,"minBookingLength")} type='number' defaultValue={minBookingLength}  id='min-nights' />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' defaultValue={maxBookingLength} id='max-nights' />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' defaultValue={maxGuestPerBooking} id='max-guests' />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' defaultValue={breakfastPrice} id='breakfast-price' />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
