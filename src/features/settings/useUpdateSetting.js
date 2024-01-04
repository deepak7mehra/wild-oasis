import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting(){

    const queryClient = useQueryClient();

    const {mutate: updateSetting, isLoading:isUpdating} = useMutation({
        mutationFn: (newSettingData) => updateSettingApi(newSettingData),
        onSuccess : ()=>{
          console.log("setting successfullt created");
          queryClient.invalidateQueries({queryKey:["settings"]});
          reset();
        },
        onError: (err) =>{
          console.log(err)
          console.log("an error occured ")
        
        }
          
      });


    return {isUpdating,updateSetting};


}