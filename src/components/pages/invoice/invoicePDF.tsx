import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { InvoiceProps } from "@/types/InvoiceTypes";
import { logoUrl } from "@/lib/constants/base64";

const styles = StyleSheet.create({
  container: { padding: 20, fontFamily: "Helvetica" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: { width: 100, height: 100 },
  title: { fontSize: 20, fontWeight: "bold" },
  section: { marginBottom: 20 },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    textTransform: "capitalize",
  },
  label: { fontSize: 10, color: "#888" },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    marginVertical: 10,
  },
  flexRow: { flexDirection: "row", justifyContent: "space-between" },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemDetails: { flexDirection: "row", alignItems: "center" },
  itemImage: { width: 50, height: 50, marginRight: 10 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "#888",
  },
  gridRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  gridColumn: {
    display: "flex",
    flexDirection: "column",
    width: "48%",
  },
  halfGridColumn: {
    display: "flex",
    flexDirection: "column",
    width: "48%",
  },
  thirdGridColumn: {
    display: "flex",
    flexDirection: "column",
    width: "24%",
  },
});

const InvoicePDF = ({
  orderID,
  cartItems,
  shippingDetails,
  totalAmount,
  discount,
  fee,
  shippingFee,
  netAmount,
}: InvoiceProps) => {
  const invoiceDate = new Date().toLocaleDateString();

  console.log(totalAmount, netAmount, fee, discount);

  return (
    <Document>
      <Page size="A4" style={styles.container}>
        <View style={styles.header}>
          <Image src={logoUrl} style={styles.logo} />
          <View>
            <Text style={styles.label}>Order ID</Text>
            <Text style={styles.title}>#{orderID}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.flexRow}>
            <View>
              <Text style={styles.label}>Order Date</Text>
              <Text style={styles.text}>{invoiceDate}</Text>
            </View>
            <View>
              <Text style={styles.label}>Estimated Delivery</Text>
              <Text style={styles.text}>3 - 14 days</Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.heading}>Shipping Details</Text>
          <View style={styles.gridRow}>
            <View style={styles.halfGridColumn}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.text}>
                {shippingDetails.firstName} {shippingDetails.lastName}
              </Text>
              <Text style={styles.text}>{shippingDetails.address}</Text>
              <Text style={styles.text}>
                {shippingDetails.city}, {shippingDetails.state}
              </Text>
              <Text style={styles.text}>
                {shippingDetails.country}, {shippingDetails.code}
              </Text>
            </View>
            <View style={styles.thirdGridColumn}>
              <Text style={styles.label}>Information</Text>
              <Text style={{ fontSize: 12, lineHeight: 1.5 }}>
                {shippingDetails.email}
              </Text>
              <Text style={styles.text}>{shippingDetails.contact}</Text>
            </View>
            <View style={styles.thirdGridColumn}>
              <Text style={styles.label}>Shipping Method</Text>
              <Text style={styles.text}>{shippingDetails.shippingMethod}</Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.heading}>Order Items</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemDetails}>
                <Image src={item.imageUrls[0]} style={styles.itemImage} />
                <View>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>
                    <Text style={{ color: "#888" }}>Color:</Text> {item.color}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={{ color: "#888" }}>Size:</Text> {item.size}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.text}>${item.price.toFixed(2)}</Text>
                <Text style={styles.text}>x {item.quantity}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.heading}>Order Summary</Text>
          <View style={styles.gridRow}>
            <View style={styles.gridColumn}></View>
            <View style={styles.gridColumn}>
              <View style={styles.summaryRow}>
                <Text style={styles.text}>Subtotal</Text>
                <Text style={styles.text}>${totalAmount.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.text}>Shipping</Text>
                <Text style={styles.text}>${shippingFee.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.text}>Discount</Text>
                <Text style={styles.text}>-${discount.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.text}>Tax</Text>
                <Text style={styles.text}>${fee.toFixed(2)}</Text>
              </View>
              <View style={styles.divider}></View>
              <View style={styles.summaryRow}>
                <Text style={styles.text}>Total</Text>
                <Text style={styles.text}>${netAmount.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Text>Contact braszy957@gmail.com if there are any issues</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
