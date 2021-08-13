<template>
  <div>
    <v-img
      src="../../assets/banner-about.jpg"
      max-height="460"
      position="center 20%"
    >
    </v-img>
    <v-container class="py-6 px-5 px-sm-16">
      <div class="text-h3 font-weight-bold text-center blue-grey--text">
        關於我們
      </div>
      <div class="text-h6 my-8 px-sm-16">
        An Shop 創立於 2021
        年，每件貨品皆由專人從國外帶回，立志於把最好的產品帶給顧客，令顧客擁有最獨特最具個性的美麗，一直以來秉持著對飾品的熱忱，以創新以及獨特的商品為主軸，讓喜愛生活風格的你們，擁有最獨一無二的商品。
        <br>
        我們希望每一個飾品，都能夠成為生活裡的輕鬆假期，點亮妳天生的美麗，襯托我們獨一無二的氣質，從耳環、戒指到項鍊，從青春、知性到穩重，都有一件飾品陪妳度過，展現生活中的每個感受。
      </div>
      <v-divider></v-divider>
      <div class="text-h3 font-weight-bold text-center blue-grey--text my-8">
        聯絡資訊
      </div>
      <v-row>
        <v-col cols="12" sm="6">
          <div class="d-flex align-center text-h6 mb-6">
            <v-icon color="blue-grey" class="mr-1">mdi-phone</v-icon>
            <div>連絡電話 : (02) 28282828</div>
          </div>
          <div class="d-flex align-center text-h6 mb-6">
            <v-icon color="blue-grey" class="mr-1">mdi-home</v-icon>
            <div>店面地址 : 110台北市信義區市府路1號</div>
          </div>
          <div class="d-flex align-center text-h6 mb-6">
            <v-icon color="blue-grey" class="mr-1">mdi-clock-time-three</v-icon>
            <div>營業時間 : 15:00 ~ 21:00</div>
          </div>
          <div class="d-flex align-center text-h6">
            <v-icon color="blue-grey" class="mr-1">mdi-email</v-icon>
            <div>電子郵件 : AnShop@gmail.com</div>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115676.73003252424!2d121.49439485820317!3d25.037541700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb9dc73545d%3A0x6513f5fb17ad1f67!2z6Ie65YyX5biC5pS_5bqc!5e0!3m2!1szh-TW!2stw!4v1627737109491!5m2!1szh-TW!2stw"
            width="100%"
            height="450"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div class="text-h3 font-weight-bold text-center blue-grey--text my-8">
        常見FAQ
      </div>
      <v-row>
        <v-col cols="12">
          <v-expansion-panels accordion>
            <v-expansion-panel>
              <v-expansion-panel-header
                color="blue-grey lighten-4"
                class="font-weight-bold blue-grey--text text--darken-4">
                有提供國外運送服務嗎 ?
              </v-expansion-panel-header>
              <v-expansion-panel-content class="pt-3">
                有喔 ! 我們目前提供全球運送
              </v-expansion-panel-content>
           </v-expansion-panel>
           <v-expansion-panel>
              <v-expansion-panel-header
                color="blue-grey lighten-4"
                class="font-weight-bold blue-grey--text text--darken-4">
                我應該如何下訂單 ?
              </v-expansion-panel-header>
              <v-expansion-panel-content class="pt-3">
                請將商品加入購物車之後，點擊上方購物車圖示確認商品即可前往結帳
              </v-expansion-panel-content>
           </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header
                color="blue-grey lighten-4"
                class="font-weight-bold blue-grey--text text--darken-4">
                請問該如何退貨 ?
              </v-expansion-panel-header>
              <v-expansion-panel-content class="pt-3">
                請致電店面連絡電話，會有專人為您服務
              </v-expansion-panel-content>
           </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header
                color="blue-grey lighten-4"
                class="font-weight-bold blue-grey--text text--darken-4">
                請問商品該如何保養 ?
              </v-expansion-panel-header>
              <v-expansion-panel-content class="pt-3">
                建議每星期清潔一次，配戴後以拭銀布清潔，沾上人體汗水或油脂便會失去光澤，避免外力磨損或碰觸化學品、運動配戴、接觸溫泉或海水
              </v-expansion-panel-content>
           </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
