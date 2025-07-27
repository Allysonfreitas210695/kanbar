import { MapPin, Phone, Clock, DollarSign } from "lucide-react";
import Location from "@/types/Location";
import locationDefault from "../../../public/imgs/locais-default.jpg";

interface CardLocaisProps {
  location: Location;
}

function CardLocais({ location }: CardLocaisProps) {
  return (
    <div className="bg-white w-full max-w-[1100px] rounded-xl shadow-md flex overflow-hidden mx-auto">
      <img
        src={location.image || locationDefault}
        alt={location.name}
        className="w-[330px] h-full object-cover"
      />

      <div className="flex flex-col justify-between p-6 w-full">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{location.name}</h2>

          <div className="text-sm text-gray-700 space-y-1">
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-500" />
              {location.address}, {location.city}
            </p>
            <p className="flex items-center gap-2">
              <Clock size={16} className="text-gray-500" />
              Horário de funcionamento: {location.horario}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-gray-500" />
              Telefone: {location.phone}
            </p>
            <p className="flex items-center gap-2">
              <DollarSign size={16} className="text-gray-500" />
              Preço por pessoa: R$ {location.price.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-4">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${
            location.isopen ? 'bg-red-900 text-white' : 'bg-[#ADCC42] text-white'
          }`}
        >
          {location.isopen? 'Fechado' : 'Aberto'}
        </span>
        </div>
      </div>
    </div>
  );
}

export default CardLocais;
