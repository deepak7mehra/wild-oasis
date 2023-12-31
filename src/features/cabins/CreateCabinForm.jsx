

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";


import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";




function CreateCabinForm({cabinToEdit = {},onCloseModal}) {

  const {id:editId, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);


  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEditSession ? editValues: {}
  });
  const {errors} = formState;

  const {isCreating,createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();

  const isWorking = isCreating || isEditing;


  

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession){
      editCabin({newCabinData : {...data,image},id:editId},{
        onSuccess: (data)=>{
          reset();
          onCloseModal?.()
        }
      });
    }

    else createCabin({...data,image: image},{
      onSuccess : (data)=>{
        console.log(data);
        reset();
        onCloseModal?.()
      }
    });
  
  }

  function onError(errors){
    console.log("error in forms");
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)} type={onCloseModal ? 'modal':'regular'}>
      <FormRow label="Cabin name" error = {errors?.name?.message}>
        <Input {...register("name", {
          required: 'this field is required'
        })}  type="text" id="name" />
      </FormRow>

        <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input {...register("maxCapacity",{
          required:"this field is require",
          min :{
            value:1 ,
            message: "Capacty should be at least 1"
          }
        })} type="number" id="maxCapacity" />
        </FormRow>


        <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
          <Input {...register("regularPrice",{
            required: "this field is required"
          })} type="number" id="regularPrice" />

        </FormRow>

        <FormRow label="discount" error={errors?.discount?.message}>
        <Input {...register("discount",{
          required:"this field is required",
          validate: (value)=> value < getValues().regularPrice || "Discount should be greater than regular price"
        })}
         type="number"
          id="discount" 
          defaultValue={0}
          />
        </FormRow>

        <FormRow label="description" error={errors?.description?.message}>
        <Textarea {...register("description",{
          required:"this field is required"
        })} type="number" id="description" defaultValue="" />

        </FormRow>
        <FormRow label="image" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image",{
          required: isEditSession? false : "this field is required"
        })} />

        </FormRow>
      


  

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={()=>onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking} size = {"medium"} variation={"primary"} >{ isEditSession? "Edit Cabin" : "Add cabin"}</Button>
      </FormRow> 
    </Form>
  );
}

export default CreateCabinForm;
