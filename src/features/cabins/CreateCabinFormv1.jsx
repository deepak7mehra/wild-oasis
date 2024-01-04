

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";


import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";




function CreateCabinFormV1() {

  const {register, handleSubmit, reset, getValues, formState} = useForm();
  const {errors} = formState;

  const queryClient = useQueryClient();

  const {mutate, isLoading:isCreating} = useMutation({
    mutationFn: newcabin => createCabin(newcabin),
    onSuccess : ()=>{
      console.log("new cabin successfullt created");
      queryClient.invalidateQueries({queryKey:["cabins"]});
      reset();
    },
    onError: (err) => console.log("error occured")
  });


  

  function onSubmit(data) {
     mutate({...data,image: data.image[0]});
  }

  function onError(errors){
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      {/* <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input {...register("name", {
          required: 'this field is required'
        })}  type="text" id="name" />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow> */}
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
        <FormRow label="imahe" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image",{
          required:"this field is required"
        })} />

        </FormRow>
      


  

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating} size = {"medium"} variation={"primary"} >Add cabin</Button>
      </FormRow> 
    </Form>
  );
}

export default CreateCabinFormV1;
