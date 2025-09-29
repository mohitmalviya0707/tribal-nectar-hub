import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download, FileText, Table, Calendar, Filter } from "lucide-react";

const ExportReports = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  const [reportType, setReportType] = useState<string>('applications');
  const [dateRange, setDateRange] = useState<string>('month');
  const [includeSections, setIncludeSections] = useState({
    summary: true,
    applications: true,
    analytics: true,
    maps: false,
    recommendations: true
  });
  const [isExporting, setIsExporting] = useState(false);

  const reportTypes = [
    { value: 'applications', label: 'Application Status Report' },
    { value: 'land', label: 'Land Records Report' },
    { value: 'analytics', label: 'Analytics Dashboard Report' },
    { value: 'compliance', label: 'Compliance Report' },
    { value: 'financial', label: 'Financial Summary Report' }
  ];

  const dateRanges = [
    { value: 'week', label: 'Last 7 days' },
    { value: 'month', label: 'Last 30 days' },
    { value: 'quarter', label: 'Last 3 months' },
    { value: 'year', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (exportFormat === 'pdf') {
        await generatePDFReport();
      } else {
        await generateExcelReport();
      }
      
      toast({
        title: "Export Successful",
        description: `${reportType} report exported as ${exportFormat.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to generate report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const generatePDFReport = async () => {
    // Mock PDF generation
    const reportData = generateReportData();
    
    // In a real implementation, you would use a library like jsPDF or send to backend
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportType}_report_${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateExcelReport = async () => {
    // Mock Excel generation
    const reportData = generateReportData();
    
    // In a real implementation, you would use a library like SheetJS or ExcelJS
    const csvContent = convertToCSV(reportData);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateReportData = () => {
    return {
      reportInfo: {
        type: reportType,
        dateRange: dateRange,
        generatedAt: new Date().toISOString(),
        includedSections: includeSections
      },
      summary: includeSections.summary ? {
        totalApplications: 247,
        approvedApplications: 89,
        rejectedApplications: 15,
        pendingApplications: 143,
        totalLandArea: "1,456 acres",
        avgProcessingTime: "14 days"
      } : null,
      applications: includeSections.applications ? [
        {
          id: "APP001",
          applicant: "Raj Kumar Meena",
          scheme: "Forest Rights Act 2006",
          status: "Approved",
          submittedDate: "2024-01-20",
          processedDate: "2024-02-03",
          landArea: "2.5 acres"
        },
        {
          id: "APP002",
          applicant: "Sunita Bhil",
          scheme: "PM Kisan",
          status: "Pending",
          submittedDate: "2024-01-18",
          processedDate: null,
          landArea: "1.2 acres"
        }
      ] : null,
      analytics: includeSections.analytics ? {
        applicationsByState: {
          "Madhya Pradesh": 142,
          "Rajasthan": 98,
          "Gujarat": 76,
          "Odisha": 54
        },
        approvalRate: "72%",
        avgProcessingTime: "14 days",
        topSchemes: ["Forest Rights Act", "PM Kisan", "Jal Jeevan Mission"]
      } : null,
      recommendations: includeSections.recommendations ? [
        {
          type: "Process Improvement",
          description: "Implement digital document verification to reduce processing time by 30%"
        },
        {
          type: "Resource Allocation",
          description: "Deploy additional officers to Madhya Pradesh region due to high application volume"
        }
      ] : null
    };
  };

  const convertToCSV = (data: any) => {
    if (!data.applications) return '';
    
    const headers = ['ID', 'Applicant', 'Scheme', 'Status', 'Submitted Date', 'Processed Date', 'Land Area'];
    const rows = data.applications.map((app: any) => [
      app.id,
      app.applicant,
      app.scheme,
      app.status,
      app.submittedDate,
      app.processedDate || 'N/A',
      app.landArea
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Download className="w-5 h-5 mr-2" />
          {t('exportReports')}
        </CardTitle>
        <CardDescription>
          Generate and download comprehensive reports in PDF or Excel format
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Export Format</label>
          <div className="flex space-x-4">
            <Button
              variant={exportFormat === 'pdf' ? 'default' : 'outline'}
              onClick={() => setExportFormat('pdf')}
              className="flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button
              variant={exportFormat === 'excel' ? 'default' : 'outline'}
              onClick={() => setExportFormat('excel')}
              className="flex items-center"
            >
              <Table className="w-4 h-4 mr-2" />
              Excel/CSV
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Include Sections</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="summary"
                checked={includeSections.summary}
                onCheckedChange={(checked) => 
                  setIncludeSections(prev => ({ ...prev, summary: checked as boolean }))
                }
              />
              <label htmlFor="summary" className="text-sm">Executive Summary</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="applications"
                checked={includeSections.applications}
                onCheckedChange={(checked) => 
                  setIncludeSections(prev => ({ ...prev, applications: checked as boolean }))
                }
              />
              <label htmlFor="applications" className="text-sm">Application Details</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="analytics"
                checked={includeSections.analytics}
                onCheckedChange={(checked) => 
                  setIncludeSections(prev => ({ ...prev, analytics: checked as boolean }))
                }
              />
              <label htmlFor="analytics" className="text-sm">Analytics & Charts</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="maps"
                checked={includeSections.maps}
                onCheckedChange={(checked) => 
                  setIncludeSections(prev => ({ ...prev, maps: checked as boolean }))
                }
              />
              <label htmlFor="maps" className="text-sm">Map Snapshots</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recommendations"
                checked={includeSections.recommendations}
                onCheckedChange={(checked) => 
                  setIncludeSections(prev => ({ ...prev, recommendations: checked as boolean }))
                }
              />
              <label htmlFor="recommendations" className="text-sm">AI Recommendations</label>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button 
            onClick={handleExport}
            disabled={isExporting}
            className="w-full"
            size="lg"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Report...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                {t('exportReports')} ({exportFormat.toUpperCase()})
              </>
            )}
          </Button>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">Report Preview</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>📊 Report Type: {reportTypes.find(t => t.value === reportType)?.label}</p>
            <p>📅 Date Range: {dateRanges.find(r => r.value === dateRange)?.label}</p>
            <p>📄 Format: {exportFormat.toUpperCase()}</p>
            <p>📋 Sections: {Object.values(includeSections).filter(Boolean).length} of {Object.keys(includeSections).length} included</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportReports;