<template>
  <div>
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Charts</h1>
    <!-- Content Row -->
    <div class="row">
      <div class="col-xl-8 col-lg-7">
        <!-- Area Chart -->
        <div class="card shadow mb-4">
          <!-- Card Header - Accordion -->
          <a
            href="#area-chart"
            class="d-block card-header py-3"
            data-toggle="collapse"
            role="button"
            aria-expanded="true"
            aria-controls="area-chart"
          >
            <h6 class="m-0 font-weight-bold text-primary">Area Chart</h6>
          </a>
          <div class="collapse show" id="area-chart">
            <div class="card-body">
              <div class="chart-area">
                <canvas id="myAreaChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Bar Chart -->
        <div class="card shadow mb-4">
          <a
            href="#bar-chart"
            class="d-block card-header py-3"
            data-toggle="collapse"
            role="button"
            aria-expanded="true"
            aria-controls="bar-chart"
          >
            <h6 class="m-0 font-weight-bold text-primary">Bar Chart</h6>
          </a>
          <div class="collapse show" id="bar-chart">
            <div class="card-body">
              <div class="chart-bar">
                <canvas id="myBarChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Donut Chart -->
      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
          <!-- Card Header - Dropdown -->
          <a
            href="#pie-chart"
            class="d-block card-header py-3"
            data-toggle="collapse"
            role="button"
            aria-expanded="true"
            aria-controls="pie-chart"
          >
            <h6 class="m-0 font-weight-bold text-primary">Pie Chart</h6>
          </a>
          <!-- Card Body -->
          <div class="collapse show" id="pie-chart">
            <div class="card-body">
              <div class="chart-pie pt-4">
                <canvas id="myPieChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { chartsMixin } from "../../mixins/chartsMixin";
export default {
  mixins: [chartsMixin]
};
</script>

<style scoped>
</style>