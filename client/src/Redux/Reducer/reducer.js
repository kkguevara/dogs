import {
  FILTER_BY_ORIGIN,
  FILTER_BY_TEMPERAMENTS,
  GET_DOGS,
  GET_DOGS_ID,
  GET_TEMPERAMENTS,
  ORDER_NAME,
  ORDER_WEIGHT,
} from "../Action/action-types";

// inicial state:
let initialState = {
  allDog: [],
  allTemperamentos: [],
};
// definir la funcion rooReducer
function rooReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDog: action.payload,
      };

    case GET_DOGS_ID:
      return {
        ...state,
        dogId: action.payload,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        allTemperamentos: action.payload,
      };

    case ORDER_NAME:
      const dogsOrder = [...state.allDog];
      /*a, d - ascendente
            d, a - descendente */
      return {
        ...state,
        allDog:
          action.payload === "A"
            ? dogsOrder.sort((a, d) => a.nombre.localeCompare(d.nombre))
            : dogsOrder.sort((a, d) => d.nombre.localeCompare(a.nombre)),
      };

    case ORDER_WEIGHT:
      const dogsWeight = [...state.allDog];
      console.log(dogsWeight);
      return {
        ...state,
        allDog:
          action.payload === "Menor"
            ? dogsWeight.sort((a, d) => {
                const pesosAValues = a.peso.split(" - ");
                const pesosDValues = d.peso.split(" - ");

                return parseInt(pesosAValues[0]) - parseInt(pesosDValues[0]);
              })
            : dogsWeight.sort((a, d) => {
                const pesosAValues = a.peso.split(" - ");
                const pesosDValues = d.peso.split(" - ");

                return parseInt(pesosDValues[0]) - parseInt(pesosAValues[0]);
              }),
      };

    case FILTER_BY_TEMPERAMENTS:
      const dogsTemp = state.allDog.filter((dog) =>
        dog.temperamentos.includes(action.payload)
      );
      return {
        ...state,
        allDog: dogsTemp,
      };

    case FILTER_BY_ORIGIN:
      const dogsOrigin = state.allDog.filter(
        (dog) => dog.origen === action.payload
      );
      return {
        ...state,
        allDog: dogsOrigin,
      };

    default:
      return { ...state };
  }
}
export default rooReducer;
