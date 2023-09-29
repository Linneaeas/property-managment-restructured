import React from "react";
import { AdminSettingsSuites } from "./Property/property-settings-suites";
import { AdminSettingsFacilities } from "./Property/property-settings-facilities";

export function AdminPropertySettings() {
  return (
    <div className="PropertyContent">
    <AdminSettingsSuites></AdminSettingsSuites>
    <AdminSettingsFacilities></AdminSettingsFacilities>
    </div>
  );
}
