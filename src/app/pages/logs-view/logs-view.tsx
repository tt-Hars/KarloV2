import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    KarloContainer,
    KarloTypography,
    KarloBox,
    KarloAccordion,
    KarloAccordionSummary,
    KarloAccordionDetails,
    KarloButton,
    KarloCircularProgress,
    KarloCard
} from '@karlo/modules/shared/ui';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface LogEntry {
    _id: string;
    timestamp?: string;
    receivedAt?: string;
    service: string;
    level: string;
    message: string;
    correlationId?: string;
    meta?: any;
}

export const LogsView = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const LIMIT = 50;

    const fetchLogs = async (currentOffset: number) => {
        try {
            setLoading(true);
            // Request goes to Gateway -> Logging Service
            const response = await axios.get(`/api/v1/logs?limit=${LIMIT}&offset=${currentOffset}`);
            if (response.data) {
                if (currentOffset === 0) {
                    setLogs(response.data);
                } else {
                    setLogs(prev => [...prev, ...response.data]);
                }
            }
        } catch (error) {
            console.error('Failed to fetch logs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs(0);
    }, []);

    const loadMore = () => {
        const newOffset = offset + LIMIT;
        setOffset(newOffset);
        fetchLogs(newOffset);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString();
    };

    const getLevelColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'error': return 'error.main';
            case 'warn': return 'warning.main';
            case 'info': return 'info.main';
            default: return 'text.primary';
        }
    };

    return (
        <KarloContainer maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <KarloTypography variant="h4" gutterBottom>
                System Logs
            </KarloTypography>

            <KarloBox sx={{ mb: 2 }}>
                <KarloButton variant="contained" onClick={() => { setOffset(0); fetchLogs(0); }}>
                    Refresh
                </KarloButton>
            </KarloBox>

            {loading && logs.length === 0 ? (
                 <KarloBox display="flex" justifyContent="center" p={4}>
                    <KarloCircularProgress />
                 </KarloBox>
            ) : (
                <>
                    {logs.map((log) => (
                        <KarloAccordion key={log._id || Math.random().toString()}>
                            <KarloAccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <KarloBox display="flex" justifyContent="space-between" width="100%" alignItems="center" flexWrap="wrap">
                                    <KarloBox display="flex" alignItems="center" gap={2}>
                                        <KarloTypography variant="subtitle2" color="text.secondary" sx={{ minWidth: 160 }}>
                                            {formatDate(log.receivedAt || log.timestamp)}
                                        </KarloTypography>
                                        <KarloTypography variant="subtitle1" fontWeight="bold" sx={{ minWidth: 120, textTransform: 'uppercase' }}>
                                            {log.service}
                                        </KarloTypography>
                                        <KarloTypography variant="body1" color={getLevelColor(log.level)} fontWeight="bold" sx={{ minWidth: 80, textTransform: 'uppercase' }}>
                                            {log.level}
                                        </KarloTypography>
                                    </KarloBox>
                                    <KarloTypography variant="body2" noWrap sx={{ maxWidth: '40%', display: { xs: 'none', md: 'block' } }}>
                                        {log.message}
                                    </KarloTypography>
                                </KarloBox>
                            </KarloAccordionSummary>
                            <KarloAccordionDetails>
                                <KarloCard variant="outlined" sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                                    <KarloTypography variant="h6" gutterBottom>Log Details</KarloTypography>
                                    <KarloBox display="grid" gridTemplateColumns="120px 1fr" gap={1}>
                                        <KarloTypography fontWeight="bold">Message:</KarloTypography>
                                        <KarloTypography>{log.message}</KarloTypography>

                                        <KarloTypography fontWeight="bold">Correlation ID:</KarloTypography>
                                        <KarloTypography sx={{ fontFamily: 'monospace' }}>{log.correlationId || 'N/A'}</KarloTypography>

                                        <KarloTypography fontWeight="bold">Timestamp:</KarloTypography>
                                        <KarloTypography>{formatDate(log.timestamp)}</KarloTypography>

                                        <KarloTypography fontWeight="bold">Received At:</KarloTypography>
                                        <KarloTypography>{formatDate(log.receivedAt)}</KarloTypography>

                                        {log.meta && (
                                            <>
                                                <KarloTypography fontWeight="bold">Metadata:</KarloTypography>
                                                <pre style={{ overflowX: 'auto', margin: 0 }}>
                                                    {JSON.stringify(log.meta, null, 2)}
                                                </pre>
                                            </>
                                        )}
                                    </KarloBox>
                                </KarloCard>
                            </KarloAccordionDetails>
                        </KarloAccordion>
                    ))}

                    <KarloBox display="flex" justifyContent="center" mt={3}>
                        <KarloButton
                            variant="outlined"
                            onClick={loadMore}
                            disabled={loading}
                        >
                            {loading ? <KarloCircularProgress size={24} /> : 'Load More'}
                        </KarloButton>
                    </KarloBox>
                </>
            )}
        </KarloContainer>
    );
};
