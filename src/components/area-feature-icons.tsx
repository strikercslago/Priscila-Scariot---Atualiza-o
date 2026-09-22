import type { PropsWithChildren, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function MedicalIcon({ children, ...props }: PropsWithChildren<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {children}
    </svg>
  );
}

export function WeightLossIcon(props: IconProps) {
  return <MedicalIcon {...props}><rect x="3" y="4" width="14" height="16" rx="3" /><path d="M7 10a4 4 0 0 1 6 0M10 10l2-2M20 11v8m0 0-2.5-2.5M20 19l2.5-2.5" /></MedicalIcon>;
}

export function BodyWeightIcon(props: IconProps) {
  return <MedicalIcon {...props}><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M7 11a5 5 0 0 1 10 0M12 11l2-3M8 16h8" /></MedicalIcon>;
}

export function InjectionPenIcon(props: IconProps) {
  return <MedicalIcon {...props}><path d="m6 18 10-10 2 2L8 20H6v-2ZM14 6l4 4m-1-5 2-2 2 2-2 2M5 21l-2 1" /><path d="m10 14 2 2" /></MedicalIcon>;
}

export function InsulinResistanceIcon(props: IconProps) {
  return <MedicalIcon {...props}><circle cx="16" cy="12" r="6" /><path d="M9 12h3m-7-4 4 4-4 4M12 5l-8 14" /></MedicalIcon>;
}

export function LiverIcon(props: IconProps) {
  return <MedicalIcon {...props}><path d="M3 9c3-2.5 7-3.5 11-3 3 .4 5.5 2 7 4.5-1 1.5-2.8 2.6-5 3l-2 4.5c-.4.9-1.5 1.4-2.4 1.1L7 17.5C4.5 16.6 3 13.6 3 9Z" /><circle cx="10" cy="11" r=".7" fill="currentColor" stroke="none" /><circle cx="14" cy="10" r=".7" fill="currentColor" stroke="none" /><circle cx="12.5" cy="14" r=".7" fill="currentColor" stroke="none" /></MedicalIcon>;
}

function ReproductiveSystemIcon({ children, ...props }: PropsWithChildren<IconProps>) {
  return <MedicalIcon {...props}><path d="M12 20v-4c-2.5 0-4-2-4-4V8M12 16c2.5 0 4-2 4-4V8M8 9C6 9 4 8 3 6m13 3c2 0 4-1 5-3" /><circle cx="3" cy="5" r="1.5" /><circle cx="21" cy="5" r="1.5" />{children}</MedicalIcon>;
}

export function EndometriosisIcon(props: IconProps) {
  return <ReproductiveSystemIcon {...props}><circle cx="10" cy="12" r=".8" fill="currentColor" stroke="none" /><circle cx="14" cy="13" r=".8" fill="currentColor" stroke="none" /></ReproductiveSystemIcon>;
}

export function PolycysticOvaryIcon(props: IconProps) {
  return <ReproductiveSystemIcon {...props}><circle cx="5" cy="7" r=".6" fill="currentColor" stroke="none" /><circle cx="19" cy="7" r=".6" fill="currentColor" stroke="none" /></ReproductiveSystemIcon>;
}

export function FertilityIcon(props: IconProps) {
  return <MedicalIcon {...props}><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2" /><path d="M12 2v3m0 14v3m10-10h-3M5 12H2" /></MedicalIcon>;
}

export function MenopauseIcon(props: IconProps) {
  return <MedicalIcon {...props}><circle cx="10" cy="9" r="6" /><path d="M10 15v7m-3-3h6M17 5a7 7 0 0 1 4 7m-1-4 1 4-3-2" /></MedicalIcon>;
}

export function FoodRelationshipIcon(props: IconProps) {
  return <MedicalIcon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 16s-4-2.2-4-4.5a2 2 0 0 1 4-1 2 2 0 0 1 4 1c0 2.3-4 4.5-4 4.5ZM5 3v5m2-5v5m-2 0h2" /></MedicalIcon>;
}

export function MindfulEatingIcon(props: IconProps) {
  return <MedicalIcon {...props}><circle cx="12" cy="12" r="9" /><path d="M5.5 12s2.5-3 6.5-3 6.5 3 6.5 3-2.5 3-6.5 3-6.5-3-6.5-3Z" /><circle cx="12" cy="12" r="1.5" /></MedicalIcon>;
}

export function PregnancyIcon(props: IconProps) {
  return <MedicalIcon {...props}><circle cx="10" cy="4" r="2" /><path d="M10 7c-2 0-3 2-3 4v3c0 2 1 3 3 3h5c2 0 3-1.5 3-3s-1-3-3-3h-2V9c0-1-1-2-3-2Zm0 10v4m5-4v4" /><path d="M13 11c-1 1-1 3 1 4" /></MedicalIcon>;
}

export function PostpartumIcon(props: IconProps) {
  return <MedicalIcon {...props}><circle cx="8" cy="5" r="2" /><circle cx="17" cy="10" r="1.5" /><path d="M5 21v-9c0-2 1-4 3-4s3 1 3 3v2m-3 8v-5m3-3c1.5 2 3 3 6 3m-4-3c1-1 2-1 4-1 2 0 3 2 3 4v5m-3 0v-5" /></MedicalIcon>;
}

export function BreastfeedingIcon(props: IconProps) {
  return <MedicalIcon {...props}><circle cx="8" cy="5" r="2" /><circle cx="17" cy="11" r="1.5" /><path d="M5 21v-9c0-2 1-4 3-4 3 0 4 3 4 5m-4 8v-5m3-3c2 0 3 2 6 2 2 0 3 1 3 3v3m-8-5c1-2 2-3 4-3m-4 3c2 2 4 3 7 3" /></MedicalIcon>;
}

export function IntestineIcon(props: IconProps) {
  return <MedicalIcon {...props}><path d="M7 3C5 3 4 5 4 7v9c0 3 2 5 5 5h6c3 0 5-2 5-5V7c0-2-1-4-3-4M8 3v4c0 2 2 2 2 4s-2 2-2 4 2 3 4 3 4-1 4-3-2-2-2-4 2-2 2-4V3" /><path d="M10 3v3m4-3v3" /></MedicalIcon>;
}
