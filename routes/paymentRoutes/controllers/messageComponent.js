const User = require("../../../models/userModel");
const Order = require("../../../models/orderModel");

const messageComponent = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    return;
  }
  const user = await User.findById(order.userId);
  if (!order) {
    return;
  }
  const name = order.fullName;
  const orderMessage = [
    `${name}، سفارش شما به شماره ${orderId} ثبت شد. برای مشاهده وضعیت سفارش صفحه کاربری خود را مشاهده چک کنید.`,
    false,
  ];
  user.notifications.push(orderMessage);
  await user.save();
  const affiliation = await Order.paymentAffiliation.to;
  const amount = await Order.paymentAffiliation.amount;
  if (affiliation) {
    const couser = await User.findById(affiliation);
    const coname = `${couser.name} ${couser.lastname}`;
    if (!couser) {
      return;
    }
    const couserMessage = [
      `شما مبلغ${amount} از خرید ${coname} دریافت کردید.`,
      false,
    ];
    couser.notifications.push(couserMessage);
  }
};

module.exports = messageComponent;
