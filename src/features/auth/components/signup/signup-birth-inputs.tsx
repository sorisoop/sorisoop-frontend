"use client";

import { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import type { SignupSchema } from "./signup";

export function SignupBirthInputs() {
  const { setValue, formState } = useFormContext<SignupSchema>();
  const { errors } = formState;

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const yearRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);

  const onlyNumbers = (val: string) => val.replace(/[^0-9]/g, "");

  useEffect(() => {
    if (year.length === 4 && month && day) {
      setValue("birth", `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`, { shouldValidate: true });
    }
  }, [year, month, day, setValue]);

  return (
    <FormItem>
      <FormLabel>생년월일</FormLabel>
      <div className="flex gap-2">
        <Input
          ref={yearRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          placeholder="YYYY"
          value={year}
          onChange={(e) => {
            const val = onlyNumbers(e.target.value);
            setYear(val);
            if (val.length === 4) monthRef.current?.focus();
          }}
          className="flex-1"
        />

        <Input
          ref={monthRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={2}
          placeholder="MM"
          value={month}
          onChange={(e) => {
            const val = onlyNumbers(e.target.value);
            setMonth(val);
            if (val.length === 2) dayRef.current?.focus();
          }}
          className="flex-1"
        />

        <Input
          ref={dayRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={2}
          placeholder="DD"
          value={day}
          onChange={(e) => {
            const val = onlyNumbers(e.target.value);
            setDay(val);
          }}
          className="flex-1"
        />
      </div>
      {errors.birth && <p className="text-sm text-destructive mt-1">{errors.birth.message as string}</p>}
      <FormMessage />
    </FormItem>
  );
}
