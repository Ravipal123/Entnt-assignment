import React, { useState, useEffect } from "react";
import { GiShipBow } from "react-icons/gi";
import { DASHBOARD_SIDEBAR_LINKS } from "./Navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { HiMenu } from "react-icons/hi";
import classNames from "classnames";

const LinkClasses =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

function SidebarPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => {
    if (isMobile) setIsOpen(false);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Hamburger Menu */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <button onClick={toggleSidebar} aria-label="Toggle sidebar">
            <HiMenu className="text-black text-3xl" />
          </button>
        </div>
      )}

      {/* Overlay (when sidebar is open) */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-[#0a0a0a] bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={classNames(
          "bg-[#0d0d0e] fixed top-0 left-0 h-full z-50 w-[75%] sm:w-[50%] md:w-[15%] p-3 transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full": isMobile && !isOpen,
            "translate-x-0": isOpen || !isMobile,
          }
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-1 py-3">
          <GiShipBow fontSize={50} color="cyan" />
          <span className="text-neutral-100 text-[15px] pt-3">
            Ship Maintenance
          </span>
        </div>

        {/* Navigation Links */}
        <div className="py-8 flex flex-col gap-0.5">
          {DASHBOARD_SIDEBAR_LINKS.map((item) => (
            <SidebarLink
              key={item.key}
              item={item}
              currentPath={location.pathname}
              onClick={closeSidebar}
            />
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-auto mb-4">
          <button
            className="flex items-center text-neutral-400 gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:text-white active:bg-neutral-600 rounded-sm text-xl"
            onClick={() => {
              handleLogout();
              closeSidebar();
            }}
          >
            <BiLogOutCircle className="text-2xl text-white" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

function SidebarLink({ item, currentPath, onClick }) {
  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={classNames(
        currentPath === item.path ? "bg-neutral-700 text-white" : "text-neutral-400",
        LinkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}

export default SidebarPage;