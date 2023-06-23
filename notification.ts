import axios from "axios";
import { timeStamp } from "./checkNewTrans";
import "dotenv/config";

// capitalize dayjs string
const capitalize = (str: any, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(
    /(?:^|\s|["'([{])+\S/g,
    (match: any) => match.toUpperCase()
  );
export async function sendDiscord(
  amount: string,
  time: string,
  description: string,
  isServerDown: boolean
): Promise<any> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  let payload: any;

  if (isServerDown) {
    payload = {
      username: "Server is down",
      content: "Server is down",
      embeds: [
        {
          author: {
            name: "Server is down",
          },
          title: "Server is down",
          color: "ff0000",
        },
      ],
    };
  } else {
    payload = {
      username: "Nhận chuyển khoản VCB 1012.842.851",
      avatar_url:
        "https://raw.githubusercontent.com/hophamlam/vcb-trans-watchdog/main/assets/logo_vcb_1610091313.jpg",
      content: "Nhận " + amount + " VNĐ",
      embeds: [
        {
          author: {
            name: "Hồ Phạm Lâm - VCB - 1012.842.851",
            url: process.env.LSGD_URL,
            icon_url:
              "https://raw.githubusercontent.com/hophamlam/vcb-trans-watchdog/main/assets/logo_vcb_1610091313.jpg",
          },
          title: "Nhận " + amount + " VNĐ",
          color: "5613637",
          fields: [
            {
              name: capitalize(time),
              value: description,
            },
          ],
        },
      ],
    };
  }

  console.log(
    timeStamp(),
    " - Sending message to Discord:",
    JSON.stringify(payload)
  );

  return axios.post(webhookUrl!, payload);
}

// Example usage
// sendDiscord("test-amount", "test-date", "test-message");
