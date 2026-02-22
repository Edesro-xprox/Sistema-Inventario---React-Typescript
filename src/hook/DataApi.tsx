import { useEffect, useState } from "react";
import { getCollectionData } from '../services/data.service.ts';

function DataApi(){
    const [brands, setBrands] = useState([]); //almacenar las marcas obtenidas
    const [equipmentTypes, setEquipmentTypes] = useState([]); //almacenar los tipos de equipo obtenidos
    const [locations, setLocations] = useState([]); //almacenar las ubicaciones obtenidas
    const [models, setModels] = useState([]); //almacenar los modelos obtenidos
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        const getInitData = async () =>{
            try{
                const [brandsData, equipmentData, locationsData, modelsData, providersData] = await Promise.all([
                    getCollectionData('brands'),
                    getCollectionData('equipment_types'),
                    getCollectionData('locations'),
                    getCollectionData('models'),
                    getCollectionData('providers'),
                ]);
                setBrands(brandsData);
                setEquipmentTypes(equipmentData);
                setLocations(locationsData);
                setModels(modelsData);
                setProviders(providersData);
            }catch(e: any){
                console.error(e);
            }
        }
        getInitData();
    }, []);

    return {
        brands,
        equipmentTypes,
        locations,
        models,
        providers
    }
}

export default DataApi;