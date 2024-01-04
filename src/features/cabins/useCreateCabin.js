import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";


export function useCreateCabin(){
    const queryClient = useQueryClient();

  const {mutate: createCabin, isLoading:isCreating} = useMutation({
    mutationFn: newcabin => createEditCabin(newcabin),
    onSuccess : ()=>{
      console.log("new cabin successfullt created");
      queryClient.invalidateQueries({queryKey:["cabins"]});
    },
    onError: (err) => console.log("error occured")
  });

  return {isCreating,createCabin}

}