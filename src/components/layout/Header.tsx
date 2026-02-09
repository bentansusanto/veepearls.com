'use client'
import { GetUser, Logout } from '@/common/Fetching/Auth/Auth'
import { GetAllCart } from '@/common/Fetching/Cart/fetch-cart'
import { JewelType } from '@/common/Fetching/Product/fetch-jewel'
import { Mobile } from '@/common/media-query'
import { useScrollPosition } from '@/common/use-scroll-mobile-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import ListProductCart from '@/features/Cart/ListProductCart'
import { menuLeftMobile, menuNavigation, socialMedia } from '@/lib/nav-data'
import {
  ChevronDown,
  ChevronLeft,
  Facebook,
  Instagram,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../ui/button'
import { ThemeToggle } from '../ui/theme-toggle'
import MenuAccount from './header-mobile-component/account/MenuAccount'
import ListSearch from './header-mobile-component/search/ListSearch'

const Header = () => {
  const { isMobile } = Mobile()
  const { scrollY } = useScrollPosition()
  const { data: userData } = GetUser()
  const { data: jewelData } = JewelType()
  const { data: cartData } = GetAllCart()
  const { logout } = Logout()
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [selectMenu, setSelectMenu] = useState<number | null>(0)
  const handleSelectMenu = (index: number) => {
    setSelectMenu(selectMenu === index ? null : index)
  }
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <div>
      {/* Mobile Device */}
      {isMobile ? (
        <div>
          {/* Header */}
          <div
            className={`${
              scrollY === 0 ? 'translate-y-0' : '-translate-y-full'
            } transform transition-transform duration-300 sticky top-0 border-b border-gray-100 dark:border-gray-600 left-0 w-full z-50`}
          >
            <div className="flex items-center justify-between px-5 py-4 sticky top-0">
              <div className="flex items-center space-x-8">
                <div onClick={handleOpenMenu}>
                  <Menu width={20} height={20} strokeWidth={1.5} />
                </div>
                <ThemeToggle />
              </div>
              {/* logo */}
              <Link prefetch={true} href="/">
                <Image
                  src={'/images/img-logo-veepearl.svg'}
                  alt="logo"
                  width={0}
                  height={0}
                  className="w-20"
                />
              </Link>
              {/* nav menu mobile */}
              <div className="flex items-center space-x-8">
                {menuLeftMobile.map((item, index) => (
                  <div key={index}>
                    {item === 'Search' ? (
                      <Dialog>
                        <DialogTrigger>
                          <Search width={20} height={20} strokeWidth={1.5} />
                        </DialogTrigger>
                        <DialogContent className="px-5">
                          <DialogHeader className="-mt-2">
                            <DialogTitle className="text-start font-medium text-[16px]">
                              Search product
                            </DialogTitle>
                          </DialogHeader>
                          <ListSearch />
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Drawer>
                        <DrawerTrigger className="relative">
                          <ShoppingBag width={20} height={20} strokeWidth={1.5} />
                          {cartData?.length > 0 && (
                            <span className="bg-red-500 w-3 h-3 animate-pulse p-0.5 text-white absolute top-0 right-0 flex justify-center mx-auto rounded-full text-xs" />
                          )}
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle className="text-start">Shopping Cart</DrawerTitle>
                          </DrawerHeader>
                          <ListProductCart />
                          <DrawerFooter>
                            <Button className="py-3">
                              <Link href="/checkout">Checkout</Link>
                            </Button>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* open menu */}
          <div
            className={`${
              openMenu ? 'left-0' : 'opacity-0 pointer-events-none'
            } fixed h-screen w-full z-50 top-0 transition-all duration-500 bg-black/50`}
          >
            <div
              className={`${
                openMenu ? 'left-0 w-[90%]' : 'opacity-0 w-0 pointer-events-none'
              } fixed h-screen top-0 transition-all duration-500 bg-white dark:bg-gray-800 p-5`}
            >
              {/* close menu */}
              <button
                onClick={() => setOpenMenu(false)}
                className="bg-gray-100 dark:text-black p-1 rounded-full"
              >
                <X width={24} height={24} strokeWidth={1.5} />
              </button>
              <div className="bg-gray-200 dark:bg-gray-600 h-[1px] w-full my-5" />
              <div className="space-y-8 overflow-y-scroll">
                {menuNavigation.map((item, index) => (
                  <div key={index}>
                    <div
                      onClick={() => handleSelectMenu(index)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <Link prefetch={true} href={item.href} className="uppercase text-[16px]">
                        {item.title}
                      </Link>
                      <ChevronDown
                        width={18}
                        height={18}
                        strokeWidth={1.5}
                        className={`transform transition-transform duration-300 ${
                          selectMenu === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        selectMenu === index
                          ? 'max-h-[500px] opacity-100 mt-5'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      {item.title === 'Jewellery Type' ? (
                        <ul className="space-y-5 ml-5">
                          {jewelData?.map((item: any, index: any) => (
                            <li
                              key={index}
                              className="uppercase text-sm text-gray-500 hover:text-[#A78E57]"
                            >
                              <Link prefetch={true} href={`/jewellery-type/${item.type}`}>
                                {item.name_type}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="space-y-5 ml-5">
                          {item.submenu?.map((child, index) => (
                            <li
                              key={index}
                              className="uppercase text-sm text-gray-500 hover:text-[#A78E57]"
                            >
                              <Link prefetch={true} href={child.href}>
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-200 dark:bg-gray-600 h-[1px] w-full my-5" />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gray-100 dark:bg-gray-700">
                <div className="flex items-center justify-between">
                  {userData ? (
                    <span
                      onClick={logout}
                      className="flex cursor-pointer items-center space-x-5 text-sm text-red-500"
                    >
                      <LogOut width={16} height={16} strokeWidth={1.75} className="me-2" />
                      Logout
                    </span>
                  ) : (
                    <Link prefetch={true} href={'/login'} className="flex items-center space-x-3">
                      <User width={20} height={20} strokeWidth={1.5} />
                      <p className="text-sm">Login</p>
                    </Link>
                  )}
                  <div className="flex items-center space-x-3">
                    {socialMedia.map((item, index) => (
                      <div key={index}>
                        <Link prefetch={true} href={item.link}>
                          {item.title === 'Facebook' ? (
                            <Facebook width={22} height={22} strokeWidth={1.5} />
                          ) : (
                            <Instagram width={22} height={22} strokeWidth={1.5} />
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* bottom menu mobile */}
          <div
            className={`${
              scrollY ? 'translate-y-0' : 'translate-y-full'
            } transform transition-transform duration-300 fixed bottom-0 left-0 w-full
             dark:bg-[#080808] dark:border-gray-500 border-t border-gray-200 bg-white py-3 px-5 z-30`}
          >
            <div className="flex items-center justify-between">
              <div onClick={handleOpenMenu} className="flex flex-col items-center">
                <Menu width={20} height={20} strokeWidth={1.5} />
                <span className="text-[10px] mt-1">Menu</span>
              </div>
              <Dialog>
                <DialogTrigger className="flex flex-col items-center">
                  <Search width={20} height={20} strokeWidth={1.5} />
                  <span className="text-[10px] mt-1">Search</span>
                </DialogTrigger>
                <DialogContent className="px-5">
                  <DialogHeader className="-mt-2">
                    <DialogTitle className="text-start font-medium text-[16px]">
                      Search product
                    </DialogTitle>
                  </DialogHeader>
                  <ListSearch />
                </DialogContent>
              </Dialog>
              <Link href="/" className="flex flex-col items-center">
                <Image
                  src="/images/img-logo-veepearl.svg"
                  width={0}
                  height={0}
                  alt="logo"
                  className="w-16"
                />
              </Link>
              <Drawer>
                <DrawerTrigger className="flex flex-col items-center">
                  <User width={20} height={20} strokeWidth={1.5} />
                  <span className="text-[10px] mt-1">Account</span>
                </DrawerTrigger>
                {userData && (
                  <DrawerContent>
                    <DrawerHeader className="flex items-center justify-between">
                      <DrawerClose>
                        <ChevronLeft />
                      </DrawerClose>
                      <DrawerTitle className="font-medium">My Account</DrawerTitle>
                      <ThemeToggle />
                    </DrawerHeader>
                    <div className="flex flex-col items-center space-y-3 px-5 mx-auto mt-5">
                      <Image
                        src="/images/avatars/1.png"
                        width={0}
                        height={0}
                        alt="account"
                        className="w-20"
                      />
                    </div>
                    <div className="px-5 mt-10 mb-8">
                      <MenuAccount userData={userData} />
                    </div>
                    {/* <DrawerFooter>
                      <Button>Submit</Button>
                    </DrawerFooter> */}
                  </DrawerContent>
                )}
              </Drawer>
              <Drawer>
                <DrawerTrigger className="relative">
                  <div className="flex flex-col items-center">
                    <ShoppingBag width={20} height={20} strokeWidth={1.5} />
                    <span className="text-[10px] mt-1">Cart</span>
                  </div>
                  {cartData?.length > 0 ? (
                    <span className="bg-red-500 w-3 h-3 animate-pulse p-0.5 text-white absolute top-0 right-0 flex justify-center mx-auto rounded-full text-xs" />
                  ) : null}
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle className="text-start">Shopping Cart</DrawerTitle>
                  </DrawerHeader>
                  <ListProductCart />
                  <DrawerFooter>
                    <Button className="py-3">
                      <Link href="/checkout">Checkout</Link>
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      ) : (
        // Desktop & Large Desktop
        <></>
      )}
    </div>
  )
}

export default Header
