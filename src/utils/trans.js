import { transStatus } from '@/api';
import cdsSdk from "@/sdk";

export async function confirmTransaction(hash, type = null) {
    let receipt = await cdsSdk.waitForTransaction(hash);
    return await new Promise((resolve, reject) => {
        let i = 0;
        const interval = setInterval(() => {
            i++;
            transStatus({ trans_hash: hash, type }).then(({ data, extra }) => {
                if (data === 1) {
                    resolve({ receipt, extra });
                    clearInterval(interval);
                }
                if (i >= 1000) {
                    reject({ receipt, extra });
                }
            }).catch(() => {
                if (i >= 1000) {
                    reject({ receipt });
                }
            });
        }, 1000);
    });
}