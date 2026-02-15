async function get_all_dog_breeds () {
    const url = Object.freeze(" https://dog.ceo/api/breeds/list/all");

    try {
        const json_data = await fetch(url);
        let data;
        const breed_list = [];

        if (!json_data.ok) {
            console.log("Error when fetching the json data");
            return;
        }

        // Parse the json file
        data = await json_data.json();
        data = data.message;                                // Get the actual data

        // Bring the sub breeds out of the breed
        for (const dog_breed in data) {
            // In the case that there are sub breeds
            // if (data[dog_breed].length > 0) {
            //     breed_list.push({
            //         breed: dog_breed,
            //         sub_breed: data[dog_breed]
            //     })
            // }
            if (data[dog_breed].length == 0) {
                data[dog_breed] = null;
            } 

            breed_list.push({
                breed: dog_breed,
                sub_breed: data[dog_breed]
            });
        }

        return breed_list;
    }
    catch (error) {
        console.error("Error when dealing with the get_all_dog_breeds: ", error);
    }
}

async function get_image (breed, sub_breed) {
    let url = `https://dog.ceo/api/breed/${breed}`;

    // If a sub breed exist, add it on to the url
    if (sub_breed !== "") {
        url += `/${sub_breed}`;
    }

    // Either way, add the rest of the url on
    url += '/images/random';
    
    console.log("STOPPER 3");

    try {
        const json_data = await fetch(url);

        if (!json_data.ok) {
            console.log("Error when fetching the image json data");
            return;
        }

        // Parse the json data
        data = await json_data.json();
        
        // Return a url to the image
        return data.message;
    }
    catch (error) {
        console.error("Error when dealing with the image fetching", error);
    }
}
