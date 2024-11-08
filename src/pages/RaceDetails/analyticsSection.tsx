import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";
import ChartSection from "./chartSection";

interface Driver {
  givenName: string;
  familyName: string;
  nationality: string;
  driverId: string;
}

interface Constructor {
  nationality: string;
}

interface RaceDetail {
  Driver: Driver;
  Constructor: Constructor;
  position: number;
  Time?: { millis: string };
  points: number;
  laps: number;
}

interface ComparisonDriver {
  xAxis: string[];
  yAxis: number[];
  title: string;
}

interface Option {
  name: string;
  code: keyof RaceDetail;
}

interface AnalyticsSectionProps {
  raceDetails: RaceDetail[];
  defaultComparisonDrivers: ComparisonDriver;
}

const options: Option[] = [
  { name: "Points", code: "points" },
  { name: "Laps", code: "laps" },
];

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
  raceDetails,
  defaultComparisonDrivers,
}) => {
  const [team, setTeam] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<any[]>([]);
  const [rowClick, setRowClick] = useState<boolean>(true);

  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const [comparisonField, setComparisonField] = useState<Option | undefined>();
  const [comparison, setComparison] = useState<ComparisonDriver>(
    defaultComparisonDrivers
  );

  useEffect(() => {
    const result = raceDetails.map((driver) => ({
      id: driver.Driver.driverId,
      name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
      position: driver.position,
      nationality: driver.Constructor.nationality,
      time: driver.Time?.millis || "",
      points: driver.points,
      laps: driver.laps,
    }));
    setTeam(result);
  }, [raceDetails]);

  const compareBetweenDrivers = (e: {
    value: React.SetStateAction<Option | undefined>;
  }) => {
    setComparisonField(e.value);
  };

  /**
   * Compares selected drivers based on the selected field.
   */
  const handelCompare = () => {
    if (!comparisonField || !selectedTeam) return;

    const xAxis: string[] = [];
    const yAxis: number[] = [];
    selectedTeam.forEach((element) => {
      xAxis.push(element.name);
      yAxis.push(Number(element[comparisonField.code]));
    });
    setComparison({
      xAxis,
      yAxis,
      title: `Compare between drivers in ${comparisonField.name}`,
    });
  };

  /**
   * Resets the comparison settings to the default values.
   */
  const resetComparing = () => {
    setSelectedTeam([]);
    setComparisonField(undefined);
    setComparison(defaultComparisonDrivers);
  };

  /**
   * Renders the search header component for filtering team data.
   * @returns JSX.Element - The header component for the DataTable.
   */
  const renderHeader = () => {
    return (
      <div className="flex gap-2 items-center justify-between">
        <div className="flex justify-between items-center ml-auto">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              type="search"
              onInput={(e) =>
                setGlobalFilter((e.target as HTMLInputElement).value)
              }
              placeholder="Search by Name..."
            />
          </IconField>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="bg-[#F9FAFB] p-4 rounded w-full flex sm:flex-col lg:flex-row items-center gap-2 border">
        <p>Compare Between Drivers in</p>
        <Dropdown
          value={comparisonField}
          onChange={compareBetweenDrivers}
          options={options}
          optionLabel="name"
          placeholder="Select a Comparison"
          disabled={!selectedTeam || selectedTeam.length < 2}
        />
        <Button
          onClick={handelCompare}
          className="ml-auto"
          label="Compare"
          rounded
        />
        <Button
          onClick={resetComparing}
          label="Reset"
          severity="danger"
          rounded
        />
      </div>
      <div className="flex sm:flex-col sm:gap-4 lg:flex-row lg:gap-0 justify-between items-center">
        <div className="sm:w-full lg:w-[48%] border rounded">
          <DataTable
            header={header}
            value={team}
            paginator
            rows={5}
            globalFilter={globalFilter || undefined}
            selectionMode={rowClick ? undefined : "checkbox"}
            selection={selectedTeam}
            onSelectionChange={(e: any) => setSelectedTeam(e.value)}
            dataKey="id"
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "0.25rem" }}
            />
            <Column
              field="position"
              header="Position"
              headerStyle={{ width: "1rem" }}
            />
            <Column field="name" header="Name" />
            <Column field="nationality" header="Nationality" />
          </DataTable>
        </div>
        <div className="sm:w-full lg:w-[48%]">
          <ChartSection comparisonDrivers={comparison} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
