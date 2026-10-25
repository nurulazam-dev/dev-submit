"use server";

import { getServiceById } from "@/services/servicesData.services";
import ServiceDetails from "../../../../components/modules/Services/ServiceDetails";

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsId = await params;
  const id = paramsId.id;

  const response = await getServiceById(id);
  const serviceData = response?.data;

  return <ServiceDetails service={serviceData} />;
}
