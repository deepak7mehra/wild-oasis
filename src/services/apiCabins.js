import supabase, { supabaseUrl } from "./supabase"

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

export async function createEditCabin(newCabin,id){    

   
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","");

    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    // https://jeewzwvsmxrsewsdphff.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg



    let query = supabase.from("cabins");


    // 1. Create cabin


    // A) CREATE
    if (!id) query = query.insert([{...newCabin,image: imagePath}])

    // B) EDIT

    if (id) query =  query.update({...newCabin,image: imagePath})
    .eq('id', id);

    const {data,error} = await query.select().single();

    if (error) {
        console.log(error);
        throw new Error("cabin can not be created")
    }


    if (hasImagePath) return data;

    //2. upload image

    const {error: storageError} = await supabase
    .storage
    .from("cabin-images")
    .upload(imageName,newCabin.image);

    if (storageError){
        await supabase
        .from('cabin')
        .delete()
        .eq('id', data.id);

        console.error(storageError);
        throw new Error("cabin image could not be uploaded")
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