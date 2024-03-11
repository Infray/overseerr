import Modal from '@app/components/Common/Modal';
import useSettings from '@app/hooks/useSettings';
import { Permission, useUser } from '@app/hooks/useUser';
import globalMessages from '@app/i18n/globalMessages';
import { Transition } from '@headlessui/react';
import type { StatusResponse } from '@server/interfaces/api/settingsInterfaces';
import { Fragment, useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import useSWR from 'swr';

const messages = defineMessages({
  appUpdated: '{applicationTitle} Updated',
  appUpdatedDescription:
    'Please click the button below to reload the application.',
  reloadApp: 'Reload {applicationTitle}',
  restartRequired: 'Server Restart Required',
  restartRequiredDescription:
    'Please restart the server to apply the updated settings.',
});

const StatusChecker = () => {
  const intl = useIntl();
  const settings = useSettings();
  const { hasPermission } = useUser();
  const { data, error } = useSWR<StatusResponse>('/api/v1/status', {
    refreshInterval: 60 * 1000,
  });
  const [alertDismissed, setAlertDismissed] = useState(false);

  useEffect(() => {
    if (!data?.restartRequired) {
      setAlertDismissed(false);
    }
  }, [data?.restartRequired]);

  if (!data && !error) {
    return null;
  }

  if (!data) {
    return null;
  }

  return null;
};

export default StatusChecker;
