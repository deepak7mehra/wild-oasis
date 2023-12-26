import supabase from "./supabase"

export async  function getCabins()  {
    
    const  { data, error } = await supabase
    .from('cabin')
    .select('*');

    if (error){
        console.error(error);
        throw new Error("cabin could not be loaded");
    }
    return data;

}

export async function deleteCabin(id){
    
    const { error } = await supabase
    .from('cabin')
    .delete()
    .eq('id', id);

    if (error) {
        console.log(error);
        throw new Error("cabin can not be deleted")
    }

}