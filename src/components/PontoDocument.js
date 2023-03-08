import { useEffect, useState } from 'react';
import {
    Document, Page, Text, View, StyleSheet, PDFViewer
} from '@react-pdf/renderer';
import moment from 'moment';

// Create styles
const styles = StyleSheet.create({

    viewer: {
        width: '100%', //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    page: {
        width: '800',
        height: '600'
    },
    view_100: {
        width: '100%',
    },
    text_center: {
        fontSize: '11px',
        textAlign: 'center',
        padding: 3
    },
    banner_top: {
        width: '100%',
        height: '60',
        backgroundColor: '#f4f4f4',
    },
    banner_top_text: {
        fontSize: '11px',
        textAlign: 'center',
        marginTop: '25'
    },
    table_info: {
        width: '100%',
        height: '80',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 3,
        margin: '0 auto',
    },

    table_head: {
        fontSize: '11px',
        textAlign: 'center'
    },
    table_ponto: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 3,
        borderBottom: 1,
        borderBottomColor: '#E8E8E8',
        margin: '0 auto',
    },
});

// Create Document Component
function MyDocument({ data }) {

    return (
        //<PDFViewer style={styles.viewer}>
        <Document>
            <Page style={styles.page}>

                <View style={styles.banner_top}>
                    <Text style={styles.banner_top_text}>
                        Nome da Empresa
                    </Text>
                </View>

                <View style={styles.view_100}>
                    <Text style={styles.text_center}>
                        Folha de Ponto
                    </Text>
                </View>

                <View style={styles.table_info}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontSize: '11px', textAlign: 'center' }}>
                            {`  Nome da Empresa
                                    Endereço da Empresa
                                    Cidade e Estado
                                    CNPJ da Empresa `}
                        </Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontSize: '11px', textAlign: 'center' }}>
                            {`  Matrícula do Funcionário
                                    Nome do Funcionário
                                    Função e Setor
                                    Projeto `}
                        </Text>
                    </View>
                </View>

                <View style={styles.view_100}>
                    <Text style={styles.text_center}>
                        {`  Jornada de Trabalho
                                Março/2023  `}
                    </Text>

                    <View style={styles.table_ponto}>
                        <Text style={{ fontSize: '11px', width: '20%', textAlign: 'center' }}>
                            Dia e Semana
                        </Text>
                        <Text style={{ fontSize: '11px', width: '6%', textAlign: 'center' }}>
                            Início
                        </Text>
                        <Text style={{ fontSize: '11px', width: '12%', textAlign: 'center' }}>
                            Intervalo
                        </Text>
                        <Text style={{ fontSize: '11px', width: '8%', textAlign: 'center' }}>
                            Término
                        </Text>
                        <Text style={{ fontSize: '11px', width: '12%', textAlign: 'center' }}>
                            Extra
                        </Text>
                        <Text style={{ fontSize: '11px', width: '20%', textAlign: 'center' }}>
                            Observações
                        </Text>
                    </View>

                    {data?.map((d, i) => {
                        return (
                            <View key={i} style={styles.table_ponto}>
                                <Text style={{ fontSize: '11px', width: '5%' }}>
                                    {d.dia}
                                </Text>
                                <Text style={{ fontSize: '11px', width: '15%' }}>
                                    {d.ext}
                                </Text>

                                <Text style={{ fontSize: '11px', width: '6%' }}>
                                    {d.ponto?.[0]}
                                </Text>
                                <Text style={{ fontSize: '11px', width: '6%' }}>
                                    {d.ponto?.[1]}
                                </Text>
                                <Text style={{ fontSize: '11px', width: '6%' }}>
                                    {d.ponto?.[2]}
                                </Text>
                                <Text style={{ fontSize: '11px', width: '8%', textAlign: 'center' }}>
                                    {d.ponto?.[3]}
                                </Text>
                                <Text style={{ fontSize: '11px', width: '6%' }}>
                                    {d.ponto?.[4]}
                                </Text>
                                <Text style={{ fontSize: '11px', width: '6%' }}>
                                    {d.ponto?.[5]}
                                </Text>
                                <Text style={{ fontSize: '11px', width: '20%' }}>
                                </Text>
                            </View>

                        );
                    })}
                </View>
            </Page>
        </Document>
        //</PDFViewer >
    );

}

export { MyDocument };