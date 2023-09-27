import React from "react";
import { AdminPropertyStandards } from "./Property/property-standards";
import {AdminPropertySuites} from "./Property/property-suites"
import {AdminPropertyBeds} from "./Property/property-beds"
import {AdminPropertyRoomtypes} from "./Property/property-roomtypes"
import {AdminPropertyFacilities} from "./Property/property-facilities"
import {AdminPropertyProperties} from "./Property/property-properties"

export function AdminPropertyContent() {
  return (
    <div className="PropertyContentNames">
     <AdminPropertySuites></AdminPropertySuites>
     <AdminPropertyStandards></AdminPropertyStandards>
     <AdminPropertyRoomtypes></AdminPropertyRoomtypes> 
     <AdminPropertyBeds></AdminPropertyBeds>
     <AdminPropertyFacilities></AdminPropertyFacilities>
     <AdminPropertyProperties></AdminPropertyProperties>
    </div>
  );
}
