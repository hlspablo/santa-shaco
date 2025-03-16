import * as React from "react";
import { View, StyleSheet, Button, Platform, Text } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <style>
      .break-page {
        page-break-after: always; 
      }
      .main-container { 
        padding: 0px 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      body {
        font-family: Arial, sans-serif;
      }
      h2 {
        color: black;
        font-size: 24px;
      }
      .section {
        margin-bottom: 35px;
      }
      .section:last-child {
        border-bottom: none;
      }
      .section-title {
        color: #6f6f6f;
        font-size: 20px;
      }
      .section-value {
        color: #000000;
        font-size: 20px;
      }
      .header-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 100px;
      }
      .page-bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .page-2 {
        display:flex;
        flex-direction: column;
        height: 95vh;
        padding: 20px 80px;
      }
      .middle-area {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .mt-5 {
        margin-top: 20px;
      }
      .font {
        font-size: 25px;
      }
    </style>
  </head>
  <body>
    <div class="main-container">
      <div class="header-container">
        <img src="data:image/png;base64,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" alt="Santander" style="width: 160px; height: 30px">
        <h2>Comprovante do Pagamento</h2>
        <span style="color: #4D4D4D; font-size: 20px">13/10/2023 - 13:05:23</span>
      </div>
      <hr style="border: 1px solid #CDCDCD; width: 100%; margin-top: 10px; margin-bottom: 10px;"/>
      <div style="margin-top:20px;">
        <div class="section-title">Valor pago</div>
        <div class="section-value">R$ 0,02</div>
      </div>
      <hr style="border: 1px solid #CDCDCD; width: 100%; margin-bottom: 10px;"/>
      <div class="section" style="margin-top: 20px;">
        <div class="section-title">Forma de pagamento</div>
        <div class="section-value">Ag 2961 Cc 300343-9</div>
      </div>
      <div class="section" style="margin-top: 20px;">
        <div class="section-title">Dados do recebedor</div>
      </div>
      <div class="section" style="margin-top: 20px;">
        <div class="section-title">Para</div>
        <div class="section-value">Pablo Henrique Lima Santos</div>
      </div>
      <div class="section">
        <div class="section-title">CPF</div>
        <div class="section-value">***.096.523-**</div>
      </div>
      <div class="section">
        <div class="section-title">Chave</div>
        <div class="section-value">***.096.523-**</div>
      </div>
      <div class="section">
        <div class="section-title">Instituição</div>
        <div class="section-value">PICPAY</div>
      </div>
      <div class="section">
        <div class="section-title">Dados do pagador</div>
      </div>
      <div class="section" style="margin-top: 50px;">
        <div class="section-title">De</div>
        <div class="section-value">Pablo Henrique Lima Santos</div>
      </div>
      <div class="section">
        <div class="section-title">CPF</div>
        <div class="section-value">***.096.523-**</div>
      </div>
      <div class="section">
        <div class="section-title">Instituição</div>
        <div class="section-value">BCO SANTANDER (BRASIL) S.A.</div>
      </div>
      <div class="section">
        <div class="section-title">ID/Transação</div>
        <div class="section-value">E90400882023103160514775778291</div>
      </div>
      <div class="section">
        <div class="section-title">Data e hora da transação</div>
        <div class="section-value">13/10/2023 - 13:05:23</div>
      </div>
      <div class="page-bottom" style="color: #4D4D4D; font-size: 20px; padding-bottom: 40px; padding-top: 40px;">
        <span>Comprovante do Pagamento</span>
        <span>1/2</span>
      </div>
    </div>
    <div class="page-2">
      <div class="section" style="margin-top: 30px;">
        <div class="section-title">Código de autenticação</div>
        <div class="section-value">803A7DE779D902F41582489</div>
      </div>
      <hr style="border: 1px solid #CDCDCD; width: 100%; margin-bottom: 10px;"/>
      <div class="middle-area">
        <div class="section-value font">Central de Atendimento Santander</div>
        <div class="section-title mt-5">4004-3535 (Capitais & Regiões Metropolitanas)</div>
        <div class="section-title mt-5">0800-702-3535 (Demais Localidades)</div>
        <div class="section-title mt-5">SAC 0800-762-7777</div>
        <div class="section-title mt-5">Ouvidoria 0800-726-0332</div>
      </div>
      <div class="page-bottom" style="color: #4D4D4D; font-size: 20px; padding-bottom: 40px; padding-top: 40px;">
        <span>Comprovante do Pagamento</span>
        <span>2/2</span>
      </div>
    </div>
  </body>
</html>
`;

export const PrintScreen = () => {
    const printToFile = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({ html, height: 1200, width: 900 });
        console.log("File has been saved to:", uri);
        await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    };

    return (
        <View style={styles.container}>
            <View style={styles.spacer} />
            <Button title="Print to PDF file" onPress={printToFile} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
        flexDirection: "column",
        padding: 8,
    },
    spacer: {
        height: 8,
    },
    printer: {
        textAlign: "center",
    },
});
