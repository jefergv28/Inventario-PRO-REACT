import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockDataProductos } from "../Dashboard/data/mockData"; // Importamos los datos de productos

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Datos para el gráfico: todos los productos y sus precios
  const data = mockDataProductos.map((product) => ({
    id: product.name,
    label: product.name,
    value: product.price, // El valor del producto (su precio)
    color: colors.primary[500], // Color fijo o puedes generar un color único para cada producto
  }));

  return (
    <ResponsivePie
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.primary[100],
            },
          },
          legend: {
            text: {
              fill: colors.primary[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.primary[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.primary[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.primary[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.primary[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={true}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: colors.grey[200],
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
