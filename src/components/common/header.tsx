"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";
import { authClient } from "@/lib/auth-client";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const { data: session } = authClient.useSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between items-center p-4 mx-auto md:p-6 lg:px-8 xl:px-12 2xl:px-16">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="BEWEAR"
            width={100}
            height={26.14}
            className="w-24 h-auto md:w-32 lg:w-36 xl:w-40"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden gap-3 items-center md:flex lg:gap-4 xl:gap-6">
          {session?.user ? (
            <>
              <div className="flex gap-3 items-center lg:gap-4">
                <Avatar className="lg:w-12 lg:h-12">
                  <AvatarImage
                    src={session?.user?.image as string | undefined}
                  />
                  <AvatarFallback>
                    {session?.user?.name?.split(" ")?.[0]?.[0]}
                    {session?.user?.name?.split(" ")?.[1]?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm font-semibold lg:text-base">
                    {session?.user?.name}
                  </h3>
                  <span className="block text-xs text-muted-foreground lg:text-sm">
                    {session?.user?.email}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => authClient.signOut()}
                className="lg:h-10 lg:px-6 lg:text-base"
              >
                <LogOutIcon className="mr-2 w-4 h-4 lg:w-5 lg:h-5" />
                Sair
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" className="lg:h-10 lg:px-6 lg:text-base">
              <Link href="/authentication">
                <LogInIcon className="mr-2 w-4 h-4 lg:w-5 lg:h-5" />
                Entrar
              </Link>
            </Button>
          )}
          <Cart />
        </div>

        {/* Mobile Menu */}
        <div className="flex gap-3 items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="px-5">
                {session?.user ? (
                  <>
                    <div className="flex space-y-6 justify">
                      <div className="flex gap-3 items-center">
                        <Avatar>
                          <AvatarImage
                            src={session?.user?.image as string | undefined}
                          />
                          <AvatarFallback>
                            {session?.user?.name?.split(" ")?.[0]?.[0]}
                            {session?.user?.name?.split(" ")?.[1]?.[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-semibold">
                            {session?.user?.name}
                          </h3>
                          <span className="block text-xs text-muted-foreground">
                            {session?.user?.email}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => authClient.signOut()}
                      >
                        <LogOutIcon />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold">Olá. Faça seu login!</h2>
                    <Button size="icon" asChild variant="outline">
                      <Link href="/authentication">
                        <LogInIcon />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Cart />
        </div>
      </div>
    </header>
  );
};
