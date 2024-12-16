import { Input } from "antd";
import { memo } from "react";

type Props = {
  onChange: (value: string) => void;
};

const SearchInput = ({ onChange }: Props) => {
  return (
    <div className="flex flex-col">
      <label className="text-lg">Search</label>
      <Input
        className="w-[250px]"
        onBlur={(element) => {
          onChange(element.currentTarget.value ?? "");
        }}
      />
    </div>
  );
};

export default memo(SearchInput);
