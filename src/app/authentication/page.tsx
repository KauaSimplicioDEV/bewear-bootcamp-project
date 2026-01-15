import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Authentication = async () => {
  return (
    <>
      <Header />
      <main className="flex flex-1 justify-center items-center py-8 md:py-12">
        <div className="container px-5 mx-auto w-full max-w-md md:max-w-lg">
          <Tabs defaultValue="sign-in" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="sign-in">Entrar</TabsTrigger>
              <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in" className="mt-6 w-full">
              <SignInForm />
            </TabsContent>
            <TabsContent value="sign-up" className="mt-6 w-full">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Authentication;
