import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const car = require("@/assets/images/car1.png");

const DOWN_PAYMENT = [5, 10, 15, 20, 25, 30, 35];
const MONTH_OPTION = [24, 36, 48, 60, 72, 84];

export default function Input() {
  // สร้าง State เพื่อทำงานกับค่าข้อมูล
  const [carPrice, setCarPrice] = useState("");
  const [carDownPayment, setCarDownPayment] = useState("");
  const [carMonth, setCarMonth] = useState("");
  const [carInterest, setCarInterest] = useState("");
  const [carInstallment, setCarInstallment] = useState("");

  const handleCalculateInstallment = () => {
    //Validate
    if (
      carPrice === "" ||
      carDownPayment === "" ||
      carMonth === "" ||
      carInterest === ""
    ) {
      Alert.alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    //คำนวณ
    //เงินดาวน์
    let downPayment = (Number(carPrice) * Number(carDownPayment)) / 100;
    //ยอดจัด
    let carPayment = Number(carPrice) - downPayment;
    //คำนวณดอกเบี้ยทั้งหมด
    let totalInterest =
      carPayment * (Number(carInterest) / 100) * (Number(carMonth) / 12);
    //คำนวณยอดผ่อนต่อเดือน
    let installmentPay = (carPayment + totalInterest) / Number(carMonth);

    //ส่งผลไปแสดงที่หน้า Result
    router.push({
      pathname: "/result",
      params: {
        downPayment: downPayment.toFixed(2),
        carPayment: carPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        installmentPay: installmentPay.toFixed(2),
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ส่วนของการแสดงรูป */}
        <Image source={car} style={styles.car} />

        {/* ส่วนของการป้อนข้อมูล */}
        <View style={styles.inputContainter}>
          <Text
            style={{
              fontSize: 26,
              fontFamily: "Kanit_700Bold",
            }}
          >
            คำนวณค่างวดรถ
          </Text>

          {/* กรอกราคารถ */}
          <Text style={{ ...styles.inputTitle, marginBottom: 10 }}>
            ราคารถ (บาท)
          </Text>
          <TextInput
            placeholder="เช่น 1,000,000"
            keyboardType="numeric"
            style={styles.inputValue}
            value={carPrice}
            onChangeText={setCarPrice}
          />

          {/* เลือกเงินดาวน์ */}
          <Text style={{ ...styles.inputTitle, marginBottom: 10 }}>
            เลือกเงินดาวน์ (%)
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {DOWN_PAYMENT.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.downPayment,
                  carDownPayment === item.toString() &&
                    styles.downPaymentSelect,
                ]}
                onPress={() => setCarDownPayment(item.toString())}
              >
                <Text
                  style={[
                    styles.downLabel,
                    carDownPayment === item.toString() &&
                      styles.downLabelSelect,
                  ]}
                >
                  {item} %
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* เลือกระยะเวลาผ่อน */}
          <Text style={{ ...styles.inputTitle, marginBottom: 10 }}>
            ระยะเวลาผ่อน(งวด)
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {MONTH_OPTION.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.moneyOption,
                  carMonth === item.toString() && styles.moneyOptionSelect,
                ]}
                onPress={() => setCarMonth(item.toString())}
              >
                <Text
                  style={[
                    styles.moneyLabel,
                    carMonth === item.toString() && styles.moneyLabelSelect,
                  ]}
                >
                  {item} %
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* กรอกดอกเบี้ย */}
          <Text style={{ ...styles.inputTitle, marginBottom: 10 }}>
            ดอกเบี้ย(% ต่อปี)
          </Text>
          <TextInput
            placeholder="เช่น 2.59"
            keyboardType="numeric"
            style={styles.inputValue}
            value={carInterest}
            onChangeText={setCarInterest}
          />

          {/* ปุ่มคำนวณค่างวด */}
          <TouchableOpacity
            style={styles.calculateButton}
            onPress={handleCalculateInstallment}
          >
            <Text style={styles.CalButtonText}>คำนวณค่างวดรถ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  CalButtonText: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 20,
    color: "white",
  },
  calculateButton: {
    backgroundColor: "blue",
    padding: 25,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  downLabel: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 16,
    color: "#373741",
  },
  downPayment: {
    margin: 5,
    padding: 20,
    width: 80,
    height: 70,
    borderRadius: 50,
    borderColor: "#5f5f5f",
    backgroundColor: "#f1f5f9",
  },
  downPaymentSelect: {
    backgroundColor: "#3a3b3b",
  },
  downLabelSelect: {
    color: "white",
  },
  moneyLabel: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 16,
    color: "#373741",
  },
  moneyOption: {
    margin: 5,
    padding: 20,
    width: 80,
    height: 70,
    borderRadius: 50,
    borderColor: "#5f5f5f",
    backgroundColor: "#f1f5f9",
  },
  moneyOptionSelect: {
    backgroundColor: "#3a3b3b",
  },
  moneyLabelSelect: {
    color: "white",
  },
  inputValue: {
    fontFamily: "Kanit_400Regular",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#5f5f5f",
    backgroundColor: "#d2d2d6",
  },
  inputTitle: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 18,
    color: "#373741",
    marginTop: 20,
  },
  inputContainter: {
    backgroundColor: "white",
    marginTop: -60,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
  },
  car: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
});
