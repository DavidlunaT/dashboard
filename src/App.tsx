import './App.css'
import Grid from '@mui/material/Grid2'
import IndicatorWeather from './components/IndicatorWeather'; 
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import Item from './interface/Item.tsx';
 {/* Hooks */ }
 import { useEffect, useState } from 'react';

 interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}

function App() {
   {/* Variable de estado y función de actualización */}
   let [indicators, setIndicators] = useState<Indicator[]>([])
    let [items, setItems] = useState<Item[]>([])

   {/* Hook: useEffect */}
   useEffect(()=>{

    let request = async () => {
        
        {/* Request */}
        let API_KEY = "d7de925e3450e1686dfb3453763173e6"
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
        let savedTextXML = await response.text();
         {/* XML Parser */}
         const parser = new DOMParser();
         const xml = parser.parseFromString(savedTextXML, "application/xml");
         {/* Arreglo para agregar los resultados */}

         let dataToIndicators : Indicator[] = new Array<Indicator>();

         {/* 
             Análisis, extracción y almacenamiento del contenido del XML 
             en el arreglo de resultados
         */}

         let name = xml.getElementsByTagName("name")[0].innerHTML || ""
         dataToIndicators.push({"title":"Location", "subtitle": "City", "value": name})

         let location = xml.getElementsByTagName("location")[1]

         let latitude = location.getAttribute("latitude") || ""
         dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })

         let longitude = location.getAttribute("longitude") || ""
         dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

         let altitude = location.getAttribute("altitude") || ""
         dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

         
        // console.log( dataToIndicators )

        {/* Modificación de la variable de estado mediante la función de actualización */}
        setIndicators( dataToIndicators )
        
        let dataToItems : Item[] = new Array<Item>();
        let timeNodes = xml.getElementsByTagName("time");
        for( let i = 0; i < 6; i++ ) {
            //Nodo actual
            let timeNode = timeNodes[i];
            //from + to
            let from = timeNode.getAttribute("from") || "";
            let to = timeNode.getAttribute("to") || "";

            // precipitation - probability
            let precipitation = timeNode.getElementsByTagName("precipitation")[0]
            let probability = precipitation.getAttribute("probability") || ""

            //humidity - value
            let humidity = timeNode.getElementsByTagName("humidity")[0]
            let value = humidity.getAttribute("value") || ""

            //clouds - all
            let clouds = timeNode.getElementsByTagName("clouds")[0]
            let all = clouds.getAttribute("all") || ""

            dataToItems.push({
                dateStart: from,
                dateEnd: to,
                precipitation: probability,
                humidity: value,
                clouds: all
            });

        }
        setItems (dataToItems)
        

    }

    request();

},[])
let renderIndicators = () => {

  return indicators
          .map(
              (indicator, idx) => (
                  <Grid key={idx} size={{ xs: 12, xl: 3 }}>
                      <IndicatorWeather 
                          title={indicator["title"]} 
                          subtitle={indicator["subtitle"]} 
                          value={indicator["value"]} />
                  </Grid>
              )
          )
   
}

  return (
    <Grid container spacing={5}>
      
        {/* Indicadores */}
       {renderIndicators()}
        {/* Tabla */}
        <Grid size={{ xs: 12, xl: 8 }}>
          {/* Grid Anidado */}
          <Grid container spacing={2}>
                     <Grid size={{ xs: 12, xl: 3 }}>
                         <ControlWeather/>
                     </Grid>
                     <Grid size={{ xs: 12, xl: 9 }}>
                         <TableWeather itemsIn ={ items }/>
                     </Grid>
                 </Grid>
        </Grid>
       
        {/* Gráfico */}
        <Grid size={{ xs: 12, xl: 4 }}><LineChartWeather/></Grid>
   
    </Grid>
  )
}

export default App
