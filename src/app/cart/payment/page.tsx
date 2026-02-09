import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import Payment from "./components/payment";
import { getCart } from "@/actions/get-cart";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

const PaymentPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user.id) {
        redirect("/");
    }
    const cart = await getCart();
    if (!cart || cart?.items.length === 0) {
        redirect("/");
    }
    if (!cart.shippingAddressId) {
        redirect("/cart/identification");
    }

    return (
        <>
            <Header />
            <main className="flex-1">
                <div className="container px-5 py-6 mx-auto max-w-4xl md:py-8">
                    <Payment cart={cart} />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default PaymentPage;