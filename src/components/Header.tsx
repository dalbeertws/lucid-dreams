"use client";
import React, { useState } from "react";
import Image from "next/image";
import CopilotChat from "@/components/CopilotChatComponents/CopilotChat";

interface MenuItem {
  name: string;
  logo: string;
  isCollapsed: boolean;
  childLinks?: { name: string; isCollapsed?: boolean }[];
}

interface ProfileItem {
  name: string;
  logo: string;
  isCollapsed?: boolean;
}

const Header: React.FC = () => {
  const [dropdown, setDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChildVisible, setIsChildVisible] = useState(false);
  const [childMenu, setChildMenu] = useState<ProfileItem[]>([]);
  const [search , setSearch] = useState('')

  const searchMenuData: MenuItem[] = [
    {
      name: "Chat : Financial Copilot",
      logo: "/images/searchmenu/Lightbulb Bolt.png",
      isCollapsed: false,
    },
    {
      name: "New Scenario",
      logo: "/images/searchmenu/Routing.png",
      isCollapsed: true,
      childLinks: [
        {
          name: "More Positive",
        },
        {
          name: "More Negative",
        },
        {
          name: "Increasing funding (100%)",
        },
        {
          name: "Decreasing funding (50%)",
        },
      ],
    },
    {
      name: "New Model",
      logo: "/images/searchmenu/Box Minimalistic.png",
      isCollapsed: false,
    },
    {
      name: "New Hiring Plan",
      logo: "/images/searchmenu/Clipboard List.png",
      isCollapsed: false,
    },
    {
      name: "Replace Graphics",
      logo: "/images/searchmenu/Chart.png",
      isCollapsed: false,
    },
    {
      name: "Add One Graph",
      logo: "/images/searchmenu/Chart-1.png",
      isCollapsed: false,
    },
  ];

  const profiledata: ProfileItem[] = [
    {
      name: "Profile",
      logo: "/images/user-circle.png",
    },
    {
      name: "Integrations",
      logo: "/images/Bolt.png",
    },
    {
      name: "Settings",
      logo: "/images/Settings.png",
    },
    {
      name: "Refer a friend",
      logo: "/images/userhand.png",
    },
    {
      name: "Logout",
      logo: "/images/logout.png",
    },
  ];

  const [searchMenu, setSearchMenu] = useState<MenuItem[]>(searchMenuData);
  const [isDropdownCollapsed, setIsDropdownCollapsed] = useState(false);

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const handleToggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value)
    const filteredData = searchMenuData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchMenu(filteredData);
    setDropdown(true);
  };

  const handleToggleCollapseMenu = (index: number, isCollapsed: boolean) => {
    const headermenu = searchMenu[index];
    if (isCollapsed && headermenu.childLinks) {
      setIsDropdownCollapsed((prev) => !prev);
      setSearchMenu([headermenu]);
      
      // Map headermenu.childLinks to the ProfileItem interface
      const mappedChildLinks: ProfileItem[] = headermenu.childLinks.map((item) => ({
        name: item.name,
        logo: "/path/to/defaultLogo.png", // Add a default logo or customize this based on the child link
      }));
      
      setChildMenu(mappedChildLinks);
      setIsChildVisible(!isChildVisible);
      if (isChildVisible) {
        setSearchMenu(searchMenuData);
      }
    }
    if (headermenu.name === searchMenuData[0].name) {
      console.log('true')
      setIsFocused(true);
      setDropdown(false);
      setSearchMenu(searchMenuData);
    }
  };

  return (
    <header className="z-100 max-w-[2500px] mx-auto px-[40px] relative bg-white">
      <div className="flex justify-between items-center ">
        <div className="flex  gap-[24px] ">
          <div className="flex items-center">
            <div className="max-w-[144px] max-h-[30px] w-full">
              <Image
                src="../images/logo.svg    "
                alt="logo"
                width={145}
                height={35}
              />
            </div>
            <div className="min-h-[24px] my-4 border-none outline-none  flex items-center appearance-none space-x-2">
              <select
                id="dropdown"
                name="dropdown"
                className="cursor-pointer block bg-transparent appearance-none w-full text-gray-700 py-2 px-2 rounded leading-tight focus:outline-none"
              >
                <option
                  value="option1"
                  className="text-lg font-medium leading-6 cursor-pointer"
                >
                  Name of company
                </option>
                <option
                  value="option2"
                  className="text-lg font-medium leading-6 cursor-pointer"
                >
                  Option 2
                </option>
                <option
                  value="option3"
                  className="text-lg font-medium leading-6 cursor-pointer"
                >
                  Option 3
                </option>
              </select>

              <div className="flex items-center  justify-center text-gray-700">
                <svg
                  className="fill-current h-4 w-4 flex items-center  justify-center"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12l-8 8-2-2 8-8 8 8-2 2-6-6z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center  space-x-4">
            <div className="font-thin text-[30px] text-black">|</div>
            <div className="border-b-[5px]  border-[#5463FF] leading-[4rem] cursor-pointer">
              <p className=" text-[16px] font-normal text-black  px-2">
                Financials
              </p>
            </div>
            <div>
              <p className=" text-[16px] font-normal text-[#787878]  px-2 cursor-pointer">
                Hiring Plan
              </p>
            </div>
            <div>
              <p className=" text-[16px] font-normal text-[#787878]  px-2 cursor-pointer">
                Revenues
              </p>
            </div>
            <div>
              <p className=" text-[16px] font-normal text-[#787878]  px-2 cursor-pointer">
                Models
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center py-3 pr-2 relative ">
          <div className="flex  rounded-[2rem] justify-between items-center min-w-[600px] min-h-[48px]  w-full bg-[#F7F8FB]">
            <div className="flex ">
              <Image
                src="/images/search.gif"
                alt="search  gif"
                width={48}
                height={48}
              />
              <div className="flex items-center   ">
                <input
                  onFocus={()=>setDropdown(true)}
                  // onBlur={handleFocusTrue}
                  value={search}
                  onChange={(e) => handleChange(e)}
                  className=" bg-[#F7F8FB] text-black text-[16px] pl-4 font-normal placeholder:text-[#787878] placeholder:text-sm placeholder:font-normal focus:outline-none"
                  placeholder="Enter a prompt "
                />
              </div>
            </div>
            <div
              onClick={toggleDropdown}
              className=" bg-[#FFF] flex items-center gap-[2px]  rounded-[40px] mx-4 px-4 py-2 my-2"
            >
              <span>
                <Image
                  src="/images/framer.svg"
                  alt="branch"
                  width={16}
                  height={16}
                />
              </span>
              <p className="text-[14px] font-normal text-black cursor-pointer ">
                {" "}
                Main Scenario
              </p>
              <span>
                <Image
                  src="/images/downarrow.svg"
                  alt="dropdown"
                  width={16}
                  height={16}
                />
              </span>
            </div>
            {dropdown && (
              <div className="flex absolute top-[60px] right-20 w-58 mt-2 w-[83%] bg-white border border-gray-200 rounded-[1.1rem] shadow-3xl z-10">
                <div className="py-2 w-[100%]">
                  {searchMenu.map((item, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        handleToggleCollapseMenu(index, item.isCollapsed)
                      }
                      className="flex cursor-pointer items-center  px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      {item.isCollapsed && isDropdownCollapsed && (
                        <div className="mr-2">
                          <Image
                            src="/images/Arrows/Alt Arrow Left.png"
                            alt="dropdown"
                            width={20}
                            height={20}
                          />
                        </div>
                      )}
                      <Image
                        src={item.logo}
                        alt=" avatar"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                      />
                      <div className="ml-2">{item.name}</div>
                      {item.isCollapsed && !isDropdownCollapsed && (
                        <div className="ml-auto">
                          <Image
                            src="/images/Arrows/Alt Arrow Right.png"
                            alt="dropdown"
                            width={20}
                            height={20}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  {isDropdownCollapsed &&
                    childMenu.map((item, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          handleToggleCollapseMenu(index, item.isCollapsed  || false)
                        }
                        className="flex cursor-pointer items-center  px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        <div className="ml-2">{item.name}</div>
                        {item.isCollapsed && (
                          <div className="ml-auto">
                            <Image
                              src="/images/Arrows/Alt Arrow Right.png"
                              alt="dropdown"
                              width={20}
                              height={20}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  {searchMenu.length === 0 && (
                    <div className="flex cursor-pointer items-center  px-4 py-2 text-gray-800 hover:bg-gray-200">
                      <div className="ml-2">No results found</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div
            className="min-h-10 min-w-10 shrink-0 cursor-pointer"
            onClick={handleToggleProfile}
          >
            <Image
              src="/images/avatar.svg"
              alt=" avatar"
              width={40}
              height={40}
              className="cursor-pointer rounded-[40px]"
            />
          </div>
        </div>
      </div>

      <div
        className={`absolute right-2 top-[4rem] z-50 transition-transform transform ${
          isFocused ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isFocused && <CopilotChat handleFocusTrue={()=> setIsFocused(false)} />}
      </div>

      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-[1.1rem] shadow-3xl z-10 mr-3">
          <div className="p-2">
            {profiledata.map((item, index) => (
              <div
                key={index}
                onClick={handleToggleProfile}
                className="flex rounded cursor-pointer items-center  px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                <Image
                  src={item.logo}
                  alt=" avatar"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
                <div className="ml-2">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
