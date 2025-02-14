import { Outlet } from "@remix-run/react";
import { PageBody, PageContainer } from "~/components/layout/AppLayout";
import { BreadcrumbLink } from "~/components/navigation/Breadcrumb";
import { LinkButton } from "~/components/primitives/Buttons";
import {
  PageButtons,
  PageDescription,
  PageHeader,
  PageTabs,
  PageTitle,
  PageTitleRow,
} from "~/components/primitives/PageHeader";
import { useOrganization } from "~/hooks/useOrganizations";
import { useProject } from "~/hooks/useProject";
import { Handle } from "~/utils/handle";
import {
  docsPath,
  projectScheduledTriggersPath,
  projectTriggersPath,
  projectWebhookTriggersPath,
  trimTrailingSlash,
} from "~/utils/pathBuilder";

export const handle: Handle = {
  breadcrumb: (match) => <BreadcrumbLink to={trimTrailingSlash(match.pathname)} title="Triggers" />,
};

export default function Page() {
  const organization = useOrganization();
  const project = useProject();

  return (
    <PageContainer>
      <PageHeader hideBorder>
        <PageTitleRow>
          <PageTitle title="Triggers" />
          <PageButtons>
            <LinkButton
              LeadingIcon={"docs"}
              to={docsPath("documentation/concepts/triggers")}
              variant="secondary/small"
            >
              Triggers documentation
            </LinkButton>
          </PageButtons>
        </PageTitleRow>
        <PageDescription>A Trigger is what starts a Job Run.</PageDescription>
        <PageTabs
          layoutId="triggers"
          tabs={[
            {
              label: "External Triggers",
              to: projectTriggersPath(organization, project),
            },
            {
              label: "Scheduled Triggers",
              to: projectScheduledTriggersPath(organization, project),
            },
            {
              label: "Webhook Triggers",
              to: projectWebhookTriggersPath(organization, project),
            },
          ]}
        />
      </PageHeader>

      <PageBody scrollable={false}>
        <div className="h-full overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
          <Outlet />
        </div>
      </PageBody>
    </PageContainer>
  );
}
