<script setup lang="ts">
import { computed, ref } from 'vue';
import {useTheme, useDisplay} from 'vuetify';
import theme from '../../styles/chart_colorsheet';

const { name } = useDisplay();

const colors = ref(useTheme().current);

const props = defineProps({
    data: Object,
    labels: {
        type: Array,
        required: true,
    },
    title: String,
    type: String
});

const themeColors = computed(() => {
    return colors.value.dark ? theme.darkColorSheet : theme.lightColorSheet;
});
const chartData = computed(() => {
    return {
        labels:props.labels,
        datasets: [
            {
                data: props.data,
                pointRadius: 5,
                backgroundColor: themeColors.value.colors[props.type].point,
                borderColor: themeColors.value.colors[props.type].line
            },
        ]
    }
});
const chartOptions = computed(() => {
    return {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: props.title,
            }
        },
        scales: {
            x:{
                border: { display: true},
                title: {
                    display: name.value != 'xs',
                    text: "День"
                },
                ticks: {
                    display: false,
                }
            },
            y: {
                border: { display: true, color: colors.value.colors.text },
                beginAtZero: true,
                ticks: {
                    
                }
            }
        },
    }
});
</script>

<template>
    <div class="graphic">
        <Line :data="chartData" :options="chartOptions"/>
    </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)
export default {   
    extends: Line,
}
</script>

<style scoped lang='scss'>
    .graphic {
        max-height: 300px;
        aspect-ratio: 2;
    }
</style>