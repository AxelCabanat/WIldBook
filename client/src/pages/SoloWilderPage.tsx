import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneWilder } from "../services/wilders";
import { IWilder } from "../types/IWilder";

const SoloWilderPage = () => {
    const {id} =useParams();
    const [wilder, setWilder] = useState<IWilder>()

    const loadWilderIntoState = async () => {
  
        try {
          if (id)setWilder(await getOneWilder(parseInt(id)));
        } catch (err) {
          console.error(err);
        }
      };

    useEffect(() => {
        loadWilderIntoState();
    }, [])
    return (
        <div>
            {wilder?.name}
        </div>
    );
};

export default SoloWilderPage;