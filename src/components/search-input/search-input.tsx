import { Input } from "antd";

type Props = {
  onChange: (value: string) => void;
};

export const SearchInput = ({ onChange }: Props) => {
  return (
    <div className="flex flex-col mb-4">
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
