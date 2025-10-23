export interface ApiEndpoint {
  id: string;
  title: string;
  method: string;
  path: string;
  description: string;
  parameters: Array<{ 
    name: string; 
    type: string;
    required: boolean;
    description: string;
    default?: string;
  }>;
  requiresWebsite: boolean;
  exampleParams?: string;
  category: string;
  responseExample?: string;
  errorCodes?: Array<{
    code: number;
    description: string;
  }>;
}

export interface CodeExample {
  language: string;
  displayName: string;
  code: string;
}

export interface Website {
  id: string;
  name: string;
  domain: string;
}

export interface ApiCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  order: number;
}

export const API_CATEGORIES: ApiCategory[] = [
  {
    id: 'authentication',
    name: 'api.category.authentication',
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>',
    description: 'api.category.authentication.desc',
    order: 1
  },
  {
    id: 'websites',
    name: 'api.category.websites',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 sm:w-6 sm:h-6 shrink-0"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path></svg>',
    description: 'api.category.websites.desc',
    order: 2
  },
  {
    id: 'analytics',
    name: 'api.category.analytics',
    icon: ' <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-no-axes-combined-icon lucide-chart-no-axes-combined"><path d="M12 16v5"/><path d="M16 14v7"/><path d="M20 10v11"/><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/><path d="M4 18v3"/><path d="M8 14v7"/></svg>',
    description: 'api.category.analytics.desc',
    order: 3
  },
  {
    id: 'visitors',
    name: 'api.category.visitors',
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>',
    description: 'api.category.visitors.desc',
    order: 4
  },
  {
    id: 'content',
    name: 'api.category.content',
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>',
    description: 'api.category.content.desc',
    order: 5
  },
  {
    id: 'technology',
    name: 'api.category.technology',
    icon: ' <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-smartphone-icon lucide-monitor-smartphone"><path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 19v-3.96 3.15"/><path d="M7 19h5"/><rect width="6" height="10" x="16" y="12" rx="2"/></svg>',
    description: 'api.category.technology.desc',
    order: 6
  },
  {
    id: 'export',
    name: 'api.category.export',
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path></svg>',
    description: 'api.category.export.desc',
    order: 7
  }
];

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: "list-websites",
    title: "api.endpoint.listWebsites",
    method: "GET",
    path: "/api/v1/websites",
    description: "api.endpoint.listWebsites.desc",
    parameters: [],
    requiresWebsite: false,
    category: 'websites',
    responseExample: `{
  "success": true,
  "websites": [
    {
      "id": "86aa1ebd-dc28-4089-b424-fc2c69592760",
      "name": "My Website",
      "domain": "example.com",
      "created_at": "2025-01-01T00:00:00Z",
      "status": "active"
    }
  ],
  "total": 1
}`
  },
  {
    id: "get-analytics",
    title: "api.endpoint.getAnalytics",
    method: "GET",
    path: "/api/v1/websites/{websiteId}/analytics",
    description: "api.endpoint.getAnalytics.desc",
    parameters: [
      { 
        name: "days", 
        type: "integer",
        required: false,
        description: "api.param.days",
        default: "30"
      }
    ],
    requiresWebsite: true,
    exampleParams: "?days=30",
    category: 'analytics',
    responseExample: `{
  "success": true,
  "website": {
    "id": "86aa1ebd-dc28-4089-b424-fc2c69592760",
    "name": "My Website",
    "domain": "example.com"
  },
  "period": {
    "start": "2025-01-01T00:00:00Z",
    "end": "2025-01-31T23:59:59Z"
  },
  "metrics": {
    "pageViews": 45678,
    "uniqueVisitors": 12345,
    "sessions": 23456,
    "bounceRate": 32.5,
    "avgSessionDuration": 245,
    "pagesPerSession": 3.2
  }
}`
  },
  {
    id: "get-summary",
    title: "api.endpoint.getSummary",
    method: "GET",
    path: "/api/v1/websites/{websiteId}/summary",
    description: "api.endpoint.getSummary.desc",
    parameters: [],
    requiresWebsite: true,
    category: 'analytics',
    responseExample: `{
  "success": true,
  "summary": {
    "totalVisitors": 12345,
    "totalPageViews": 45678,
    "avgDailyVisitors": 411,
    "topCountry": "United States",
    "topDevice": "Desktop",
    "growthRate": 12.5
  }
}`
  },
  {
    id: "get-realtime",
    title: "api.endpoint.getRealtime",
    method: "GET",
    path: "/api/v1/websites/{websiteId}/realtime",
    description: "api.endpoint.getRealtime.desc",
    parameters: [],
    requiresWebsite: true,
    category: 'analytics',
    responseExample: `{
  "success": true,
  "realtime": {
    "activeVisitors": 23,
    "pagesPerMinute": 5,
    "topPage": "/blog",
    "recentEvents": [
      {
        "pathname": "/",
        "country": "United States",
        "device": "mobile",
        "browser": "Chrome",
        "timeAgo": 5
      }
    ]
  }
}`
  },
  {
    id: "get-timeseries",
    title: "api.endpoint.getTimeseries",
    method: "GET",
    path: "/api/v1/websites/{websiteId}/timeseries",
    description: "api.endpoint.getTimeseries.desc",
    parameters: [
      { 
        name: "days", 
        type: "integer",
        required: true,
        description: "api.param.days"
      },
      { 
        name: "interval", 
        type: "string",
        required: false,
        description: "api.param.interval",
        default: "day"
      }
    ],
    requiresWebsite: true,
    exampleParams: "?days=7&interval=day",
    category: 'analytics',
    responseExample: `{
  "success": true,
  "timeseries": [
    {
      "date": "2025-01-25",
      "visitors": 1234,
      "pageViews": 4567,
      "sessions": 2345
    }
  ]
}`
  },
  {
    id: "get-sessions",
    title: "api.endpoint.getSessions",
    method: "GET",
    path: "/api/v1/websites/{websiteId}/sessions",
    description: "api.endpoint.getSessions.desc",
    parameters: [
      { 
        name: "days", 
        type: "integer",
        required: false,
        description: "api.param.days",
        default: "30"
      },
      { 
        name: "page", 
        type: "integer",
        required: false,
        description: "api.param.page",
        default: "1"
      },
      { 
        name: "limit", 
        type: "integer",
        required: false,
        description: "api.param.limit",
        default: "50"
      }
    ],
    requiresWebsite: true,
    exampleParams: "?days=30&page=1&limit=50",
    category: 'visitors',
    responseExample: `{
  "success": true,
  "sessions": [
    {
      "sessionId": "sess_123abc",
      "startTime": "2025-01-31T10:00:00Z",
      "duration": 245,
      "pageViews": 5,
      "device": "Desktop",
      "country": "United States"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 234
  }
}`
  },
  {
    id: "get-locations",
    title: "api.endpoint.getLocations",
    method: "GET",
    path: "/api/v1/websites/{websiteId}/locations",
    description: "api.endpoint.getLocations.desc",
    parameters: [
      { 
        name: "days", 
        type: "integer",
        required: false,
        description: "api.param.days",
        default: "30"
      }
    ],
    requiresWebsite: true,
    exampleParams: "?days=30",
    category: 'visitors',
    responseExample: `{
  "success": true,
  "locations": {
    "countries": [
      {
        "country": "United States",
        "visitors": 5678,
        "percentage": 45.2
      }
    ],
    "cities": [
      {
        "city": "New York",
        "country": "United States",
        "visitors": 1234,
        "percentage": 9.8
      }
    ]
  }
}`
  },
  {
    id: "get-referrers",
    title: "api.endpoint.getReferrers",
    method: "GET",
    path: "/api/v1/websites/{websiteId}/referrers",
    description: "api.endpoint.getReferrers.desc",
    parameters: [
      { 
        name: "days", 
        type: "integer",
        required: false,
        description: "api.param.days",
        default: "30"
      },
      { 
        name: "limit", 
        type: "integer",
        required: false,
        description: "api.param.limitResults",
        default: "20"
      }
    ],
    requiresWebsite: true,
    exampleParams: "?days=30&limit=20",
    category: 'visitors',
    responseExample: `{
  "success": true,
  "referrers": [
    {
      "source": "google.com",
      "type": "search",
      "visitors": 3456,
      "percentage": 27.5
    },
    {
      "source": "direct",
      "type": "direct",
      "visitors": 2345,
      "percentage": 18.6
    }
  ]
}`
  },
  {
    id: "get-pages",
    title: "api.endpoint.getPages",
    method: "GET",
    path: "/api/v1/websites/{websiteId}/pages",
    description: "api.endpoint.getPages.desc",
    parameters: [
      { 
        name: "days", 
        type: "integer",
        required: false,
        description: "api.param.days",
        default: "30"
      },
      { 
        name: "limit", 
        type: "integer",
        required: false,
        description: "api.param.limitResults",
        default: "20"
      }
    ],
    requiresWebsite: true,
    exampleParams: "?days=30&limit=20",
    category: 'content',
    responseExample: `{
  "success": true,
  "pages": [
    {
      "path": "/home",
      "title": "Homepage",
      "views": 12345,
      "uniqueVisitors": 8765,
      "avgTimeOnPage": 145,
      "bounceRate": 28.5,
      "exitRate": 15.2
    }
  ]
}`
  },
  {
    id: "get-devices",
    title: "api.endpoint.getDevices",
    method: "GET",
    path: "/api/v1/websites/{websiteId}/devices",
    description: "api.endpoint.getDevices.desc",
    parameters: [
      { 
        name: "days", 
        type: "integer",
        required: false,
        description: "api.param.days",
        default: "30"
      }
    ],
    requiresWebsite: true,
    exampleParams: "?days=30",
    category: 'technology',
    responseExample: `{
  "success": true,
  "devices": [
    {
      "type": "Desktop",
      "visitors": 6789,
      "percentage": 54.3
    },
    {
      "type": "Mobile",
      "visitors": 4567,
      "percentage": 36.5
    },
    {
      "type": "Tablet",
      "visitors": 1155,
      "percentage": 9.2
    }
  ]
}`
  },
  {
    id: "get-browsers",
    title: "api.endpoint.getBrowsers",
    method: "GET",
    path: "/api/v1/websites/{websiteId}/browsers",
    description: "api.endpoint.getBrowsers.desc",
    parameters: [
      { 
        name: "days", 
        type: "integer",
        required: false,
        description: "api.param.days",
        default: "30"
      }
    ],
    requiresWebsite: true,
    exampleParams: "?days=30",
    category: 'technology',
    responseExample: `{
  "success": true,
  "browsers": [
    {
      "name": "Chrome",
      "version": "120.0",
      "visitors": 7890,
      "percentage": 63.1
    },
    {
      "name": "Safari",
      "version": "17.2",
      "visitors": 2345,
      "percentage": 18.7
    }
  ]
}`
  },
  {
    id: "get-os",
    title: "api.endpoint.getOs",
    method: "GET",
    path: "/api/v1/websites/{websiteId}/os",
    description: "api.endpoint.getOs.desc",
    parameters: [
      { 
        name: "days", 
        type: "integer",
        required: false,
        description: "api.param.days",
        default: "30"
      }
    ],
    requiresWebsite: true,
    exampleParams: "?days=30",
    category: 'technology',
    responseExample: `{
  "success": true,
  "operatingSystems": [
    {
      "name": "Windows",
      "version": "11",
      "visitors": 5432,
      "percentage": 43.4
    },
    {
      "name": "macOS",
      "version": "14.2",
      "visitors": 3210,
      "percentage": 25.6
    }
  ]
}`
  },
  {
    id: "get-resolutions",
    title: "api.endpoint.getResolutions",
    method: "GET",
    path: "/api/v1/websites/{websiteId}/resolutions",
    description: "api.endpoint.getResolutions.desc",
    parameters: [
      { 
        name: "days", 
        type: "integer",
        required: false,
        description: "api.param.days",
        default: "30"
      }
    ],
    requiresWebsite: true,
    exampleParams: "?days=30",
    category: 'technology',
    responseExample: `{
  "success": true,
  "resolutions": [
    {
      "resolution": "1920x1080",
      "visitors": 4321,
      "percentage": 34.5
    },
    {
      "resolution": "1366x768",
      "visitors": 2109,
      "percentage": 16.8
    }
  ]
}`
  },
  {
    id: "export-data",
    title: "api.endpoint.exportData",
    method: "GET",
    path: "/api/v1/websites/{websiteId}/export",
    description: "api.endpoint.exportData.desc",
    parameters: [
      { 
        name: "days", 
        type: "integer",
        required: true,
        description: "api.param.days"
      },
      { 
        name: "format", 
        type: "string",
        required: false,
        description: "api.param.format",
        default: "json"
      }
    ],
    requiresWebsite: true,
    exampleParams: "?days=30&format=csv",
    category: 'export'
  }
];

export const RATE_LIMITS = {
  title: "api.rateLimits.title",
  description: "api.rateLimits.description",
  limits: [
    { plan: "Basic", limit: "api.rateLimits.basic" },
    { plan: "Flex", limit: "api.rateLimits.flex" },
    { plan: "Pro", limit: "api.rateLimits.pro" }
  ],
  headers: [
    { header: "X-RateLimit-Limit", description: "api.rateLimits.header.limit" },
    { header: "X-RateLimit-Remaining", description: "api.rateLimits.header.remaining" },
    { header: "X-RateLimit-Reset", description: "api.rateLimits.header.reset" }
  ]
};

export const ERROR_CODES = [
  { code: 200, message: "api.error.200", description: "api.error.200.desc" },
  { code: 400, message: "api.error.400", description: "api.error.400.desc" },
  { code: 401, message: "api.error.401", description: "api.error.401.desc" },
  { code: 403, message: "api.error.403", description: "api.error.403.desc" },
  { code: 404, message: "api.error.404", description: "api.error.404.desc" },
  { code: 429, message: "api.error.429", description: "api.error.429.desc" },
  { code: 500, message: "api.error.500", description: "api.error.500.desc" },
  { code: 503, message: "api.error.503", description: "api.error.503.desc" }
];

export function generateCodeExamples(
  endpoint: ApiEndpoint,
  backendUrl: string,
  apiKey: string = 'YOUR_API_KEY',
  websiteId: string = 'WEBSITE_ID'
): CodeExample[] {
  const basePath = endpoint.path.replace('{websiteId}', websiteId);
  const fullUrl = `${backendUrl}${basePath}${endpoint.exampleParams || ''}`;

  const curl = `curl -X ${endpoint.method} \\
  -H "X-API-Key: ${apiKey}" \\
  -H "Accept: application/json" \\
  "${fullUrl}"`;

  const python = `import requests

url = "${fullUrl}"
headers = {
    "X-API-Key": "${apiKey}",
    "Accept": "application/json"
}

response = requests.${endpoint.method.toLowerCase()}(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")`;

  const nodejs = `const axios = require('axios');

const config = {
  method: '${endpoint.method.toLowerCase()}',
  url: '${fullUrl}',
  headers: {
    'X-API-Key': '${apiKey}',
    'Accept': 'application/json'
  }
};

axios(config)
  .then(response => {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(error => {
    console.error('Error:', error.response?.status);
  });`;

  const typescript = `import axios, { AxiosResponse } from 'axios';

interface ApiResponse {
  success: boolean;
  data: any;
}

const fetchData = async (): Promise<void> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.${endpoint.method.toLowerCase()}(
      '${fullUrl}',
      {
        headers: {
          'X-API-Key': '${apiKey}',
          'Accept': 'application/json'
        }
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchData();`;

  const php = `<?php
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "${fullUrl}",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "${endpoint.method}",
    CURLOPT_HTTPHEADER => [
        "X-API-Key: ${apiKey}",
        "Accept: application/json"
    ],
]);

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

if ($httpCode == 200) {
    $data = json_decode($response, true);
    print_r($data);
} else {
    echo "Error: HTTP $httpCode\\n";
}
?>`;

  const golang = `package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    client := &http.Client{}
    req, err := http.NewRequest("${endpoint.method}", "${fullUrl}", nil)
    
    if err != nil {
        panic(err)
    }
    
    req.Header.Add("X-API-Key", "${apiKey}")
    req.Header.Add("Accept", "application/json")
    
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    
    body, _ := ioutil.ReadAll(resp.Body)
    
    if resp.StatusCode == 200 {
        fmt.Println(string(body))
    } else {
        fmt.Printf("Error: HTTP %d\\n", resp.StatusCode)
    }
}`;

  const ruby = `require 'net/http'
require 'json'

uri = URI('${fullUrl}')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::${endpoint.method.charAt(0) + endpoint.method.slice(1).toLowerCase()}.new(uri)
request['X-API-Key'] = '${apiKey}'
request['Accept'] = 'application/json'

response = http.request(request)

if response.code == '200'
  data = JSON.parse(response.body)
  puts JSON.pretty_generate(data)
else
  puts "Error: HTTP #{response.code}"
end`;

  const csharp = `using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("X-API-Key", "${apiKey}");
        client.DefaultRequestHeaders.Add("Accept", "application/json");
        
        var response = await client.${endpoint.method.charAt(0) + endpoint.method.slice(1).toLowerCase()}Async("${fullUrl}");
        
        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            Console.WriteLine(content);
        }
        else
        {
            Console.WriteLine($"Error: {response.StatusCode}");
        }
    }
}`;

  return [
    { language: 'curl', displayName: 'cURL', code: curl },
    { language: 'python', displayName: 'Python', code: python },
    { language: 'nodejs', displayName: 'Node.js', code: nodejs },
    { language: 'typescript', displayName: 'TypeScript', code: typescript },
    { language: 'php', displayName: 'PHP', code: php },
    { language: 'go', displayName: 'Go', code: golang },
    { language: 'ruby', displayName: 'Ruby', code: ruby },
    { language: 'csharp', displayName: 'C#', code: csharp }
  ];
}