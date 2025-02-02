import { useState } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";
import { mockDataInventario as rawData } from "../Dashboard/data/mockData";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Datos de ejemplo para el gráfico
  const data = rawData.map((item) => ({
    product: item.nombreProducto,
    stock: item.cantidadStock,
  }));

  return (
    <div style={{ height: 800, width: "90%" }}>
      <ResponsiveBar
        data={data}
        theme={{
          axis: {
            domain: { line: { stroke: colors.primary[100] } },
            legend: { text: { fill: colors.primary[100] } },
            ticks: {
              line: { stroke: colors.primary[100], strokeWidth: 1 },
              text: { fill: colors.grey[200] },
            },
          },
          legends: { text: { fill: colors.primary[100] } },
        }}
        keys={["stock"]}
        indexBy="product"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={(bar) => {
          if (bar.value > 50) return "#4caf50"; // Verde (Stock alto)
          if (bar.value > 20) return "#ffeb3b"; // Amarillo (Stock medio)
          return "#f44336"; // Rojo (Stock bajo)
        }}
        borderColor={{ from: "color", modifiers: [["darker", "1.6"]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Producto",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Stock Disponible",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableLabel={false}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            translateX: 120,
            itemWidth: 100,
            itemHeight: 20,
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [{ on: "hover", style: { itemOpacity: 1 } }],
          },
        ]}
        role="application"
        barAriaLabel={(e) =>
          `${e.indexValue}: ${e.formattedValue} unidades disponibles`
        }
        tooltip={({ id, value }) => (
          <div
            style={{
              backgroundColor: colors.greenAccent[300],
              padding: "5px 10px",
              borderRadius: "5px",
              color: colors.grey[100], // Cambia el color del texto aquí
              fontSize: "14px",
            }}
          >
            <strong>{id}:</strong> {value} unidades
          </div>
        )}
      />
    </div>
  );
};

export default BarChart;
