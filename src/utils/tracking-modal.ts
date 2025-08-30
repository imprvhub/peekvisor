export function createTrackingModal(data: any, t: (key: string) => string): HTMLElement {
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4";

  const style = document.createElement('style');
  style.textContent = `
    @keyframes loader-pulse {
      0%, 100% { opacity: 0.2; }
      12.5% { opacity: 1; }
      37.5% { opacity: 0.2; }
    }
    
    .spinner-icon .loader-bar {
      animation: loader-pulse 1s ease-in-out infinite;
    }
    
    .spinner-icon .loader-bar-1 { animation-delay: 0s; }
    .spinner-icon .loader-bar-2 { animation-delay: 0.125s; }
    .spinner-icon .loader-bar-3 { animation-delay: 0.25s; }
    .spinner-icon .loader-bar-4 { animation-delay: 0.375s; }
    .spinner-icon .loader-bar-5 { animation-delay: 0.5s; }
    .spinner-icon .loader-bar-6 { animation-delay: 0.625s; }
    .spinner-icon .loader-bar-7 { animation-delay: 0.75s; }
    .spinner-icon .loader-bar-8 { animation-delay: 0.875s; }
  `;
  document.head.appendChild(style);

  const modalContent = document.createElement("div");
  modalContent.className = "bg-white dark:bg-neutral-800 border connected-pattern border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto";

  const osIcons = {
    'Windows': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 50 50"><path fill="currentColor" d="M 18.652344 3.0449219 C 14.379795 3.0802246 11.595937 5.0308594 11.414062 5.1621094 C 11.219062 5.3031094 11.081391 5.5101406 11.025391 5.7441406 L 7.7871094 19.517578 C 7.7081094 19.856578 7.8105937 20.212031 8.0585938 20.457031 C 8.3065937 20.702031 8.6649531 20.80075 9.0019531 20.71875 C 12.409953 19.64175 17.581625 19.490031 22.890625 22.457031 C 23.040625 22.541031 23.207953 22.583984 23.376953 22.583984 C 23.510953 22.583984 23.645484 22.557906 23.771484 22.503906 C 24.056484 22.380906 24.269703 22.131078 24.345703 21.830078 L 28.142578 6.9472656 C 28.249578 6.5292656 28.076891 6.0894219 27.712891 5.8574219 C 24.316141 3.6917969 21.215873 3.0237402 18.652344 3.0449219 z M 30.765625 8.1992188 C 30.609875 8.1832188 30.452234 8.2046719 30.302734 8.2636719 C 30.001734 8.3806719 29.776266 8.6342656 29.697266 8.9472656 L 25.923828 23.740234 C 25.821828 24.138234 25.974594 24.558828 26.308594 24.798828 C 29.739594 27.264828 33.206719 28 36.136719 28 C 38.978719 28 41.315094 27.309547 42.621094 26.810547 C 42.931094 26.692547 43.162281 26.428469 43.238281 26.105469 L 46.972656 10.228516 C 47.067656 9.8235156 46.901641 9.4029219 46.556641 9.1699219 C 46.211641 8.9389219 45.756016 8.9445 45.416016 9.1875 C 45.164016 9.3665 39.224937 13.652469 31.210938 8.3554688 C 31.075437 8.2674687 30.921375 8.2152187 30.765625 8.1992188 z M 13.603516 22.025391 C 10.846516 22.095516 8.5932031 22.842813 7.3457031 23.320312 C 7.0347031 23.438312 6.8045156 23.702391 6.7285156 24.025391 L 3.0253906 39.771484 C 3.0083906 39.846484 3 39.967922 3 40.044922 C 3 40.418922 3.2099687 40.759641 3.5429688 40.931641 C 3.8719688 41.101641 4.5820313 40.857422 4.5820312 40.857422 C 4.5820312 40.857422 10.454406 36.499578 18.066406 41.267578 C 18.222406 41.359578 18.397219 41.40625 18.574219 41.40625 C 18.704219 41.40625 18.835984 41.382078 18.958984 41.330078 C 19.249984 41.209078 19.467922 40.959297 19.544922 40.654297 L 23.3125 25.880859 C 23.4185 25.461859 23.246766 25.024016 22.884766 24.791016 C 19.622266 22.562016 16.360516 21.955266 13.603516 22.025391 z M 25.931641 27.083984 C 25.777516 27.070984 25.620156 27.094797 25.472656 27.154297 C 25.177656 27.274297 24.956906 27.525984 24.878906 27.833984 L 21.107422 42.617188 C 21.003422 43.020187 21.162906 43.444594 21.503906 43.683594 C 25.198906 46.265594 28.586516 47 31.228516 47 C 32.090516 47 32.8745 46.914828 33.5625 46.798828 C 36.6205 46.284828 38.508891 44.935906 38.587891 44.878906 C 38.798891 44.725906 38.940375 44.451641 38.984375 44.181641 L 42.177734 30.613281 C 42.256734 30.274281 42.15525 29.918828 41.90625 29.673828 C 41.65725 29.428828 41.299844 29.329109 40.964844 29.412109 C 35.856844 30.677109 30.785094 29.951469 26.371094 27.230469 C 26.236094 27.146969 26.085766 27.096984 25.931641 27.083984 z"/></svg>',
    'macOS': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 30 30"><path fill="currentColor" d="M25.565,9.785c-0.123,0.077-3.051,1.702-3.051,5.305c0.138,4.109,3.695,5.55,3.756,5.55 c-0.061,0.077-0.537,1.963-1.947,3.94C23.204,26.283,21.962,28,20.076,28c-1.794,0-2.438-1.135-4.508-1.135 c-2.223,0-2.852,1.135-4.554,1.135c-1.886,0-3.22-1.809-4.4-3.496c-1.533-2.208-2.836-5.673-2.882-9 c-0.031-1.763,0.307-3.496,1.165-4.968c1.211-2.055,3.373-3.45,5.734-3.496c1.809-0.061,3.419,1.242,4.523,1.242 c1.058,0,3.036-1.242,5.274-1.242C21.394,7.041,23.97,7.332,25.565,9.785z M15.001,6.688c-0.322-1.61,0.567-3.22,1.395-4.247 c1.058-1.242,2.729-2.085,4.17-2.085c0.092,1.61-0.491,3.189-1.533,4.339C18.098,5.937,16.488,6.872,15.001,6.688z"/></svg>',
    'Linux': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 266 312"><path fill="currentColor" d="M128.6640625 79.2793c0 1-1 1-1 1h-1c-1 0-1-1-2-2 0 0-1-1-1-2s0-1 1-1l2 1c1 1 2 2 2 3m-18-10c0-5-2-8-5-8 0 0 0 1-1 1v2h3c0 2 1 3 1 5h2m35-5c2 0 3 2 4 5h2c-1-1-1-2-1-3s0-2-1-3-2-2-3-2c0 0-1 1-2 1 0 1 1 1 1 2m-30 16c-1 0-1 0-1-1s0-2 1-3c2 0 3-1 3-1 1 0 1 1 1 1 0 1-1 2-3 4h-1m-11-1c-4-2-5-5-5-10 0-3 0-5 2-7 1-2 3-3 5-3s3 1 5 3c1 3 2 6 2 9v2h1v-1c1 0 1-2 1-6 0-3 0-6-2-9s-4-5-8-5c-3 0-6 2-7 5-2 4-2.4 7-2.4 12 0 4 1.4 8 5.4 12 1-1 2-1 3-2m125 141c1 0 1-.4 1-1.3 0-2.2-1-4.8-4-7.7-3-3-8-4.9-14-5.7-1-.1-2-.1-2-.1-1-.2-1-.2-2-.2-1-.1-3-.3-4-.5 3-9.3 4-17.5 4-24.7 0-10-2-17-6-23s-8-9-13-10c-1 1-1 1-1 2 5 2 10 6 13 12 3 7 4 13 4 20 0 5.6-1 13.9-5 24.5-4 1.6-8 5.3-11 11.1 0 .9 0 1.4 1 1.4 0 0 1-.9 2-2.6 2-1.7 3-3.4 5-5.1 3-1.7 5-2.6 8-2.6 5 0 10 .7 13 2.1 4 1.3 6 2.7 7 4.3 1 1.5 2 2.9 3 4.2 0 1.3 1 1.9 1 1.9m-92-145c-1-1-1-3-1-5 0-4 0-6 2-9 2-2 4-3 6-3 3 0 5 2 7 4 1 3 2 5 2 8 0 5-2 8-6 9 0 0 1 1 2 1 2 0 3 1 5 2 1-6 2-10 2-15 0-6-1-10-3-13-3-3-6-4-10-4-3 0-6 1-9 3-2 3-3 5-3 8 0 5 1 9 3 13 1 0 2 1 3 1m12 16c-13 9-23 13-31 13-7 0-14-3-20-8 1 2 2 4 3 5l6 6c4 4 9 6 14 6 7 0 15-4 25-11l9-6c2-2 4-4 4-7 0-1 0-2-1-2-1-2-6-5-16-8-9-4-16-6-20-6-3 0-8 2-15 6-6 4-10 8-10 12 0 0 1 1 2 3 6 5 12 8 18 8 8 0 18-4 31-14v2c1 0 1 1 1 1m23 202c4 7.52 11 11.3 19 11.3 2 0 4-.3 6-.9 2-.4 4-1.1 5-1.9 1-.7 2-1.4 3-2.2 2-.7 2-1.2 3-1.7l17-14.7c4-3.19 8-5.98 13-8.4 4-2.4 8-4 10-4.9 3-.8 5-2 7-3.6 1-1.5 2-3.4 2-5.8 0-2.9-2-5.1-4-6.7s-4-2.7-6-3.4-4-2.3-7-5c-2-2.6-4-6.2-5-10.9l-1-5.8c-1-2.7-1-4.7-2-5.8 0-.3 0-.4-1-.4s-3 .9-4 2.6c-2 1.7-4 3.6-6 5.6-1 2-4 3.8-6 5.5-3 1.7-6 2.6-8 2.6-8 0-12-2.2-15-6.5-2-3.2-3-6.9-4-11.1-2-1.7-3-2.6-5-2.6-5 0-7 5.2-7 15.7v31.1c0 .9-1 2.9-1 6-1 3.1-1 6.62-1 10.6l-2 11.1v.17m-145-5.29c9.3 1.36 20 4.27 32.1 8.71 12.1 4.4 19.5 6.7 22.2 6.7 7 0 12.8-3.1 17.6-9.09 1-1.94 1-4.22 1-6.84 0-9.45-5.7-21.4-17.1-35.9l-6.8-9.1c-1.4-1.9-3.1-4.8-5.3-8.7-2.1-3.9-4-6.9-5.5-9-1.3-2.3-3.4-4.6-6.1-6.9-2.6-2.3-5.6-3.8-8.9-4.6-4.2.8-7.1 2.2-8.5 4.1s-2.2 4-2.4 6.2c-.3 2.1-.9 3.5-1.9 4.2-1 .6-2.7 1.1-5 1.6-.5 0-1.4 0-2.7.1h-2.7c-5.3 0-8.9.6-10.8 1.6-2.5 2.9-3.8 6.2-3.8 9.7 0 1.6.4 4.3 1.2 8.1.8 3.7 1.2 6.7 1.2 8.8 0 4.1-1.2 8.2-3.7 12.3-2.5 4.3-3.8 7.5-3.8 9.78 1 3.88 7.6 6.61 19.7 8.21m33.3-90.9c0-6.9 1.8-14.5 5.5-23.5 3.6-9 7.2-15 10.7-19-.2-1-.7-1-1.5-1l-1-1c-2.9 3-6.4 10-10.6 20-4.2 9-6.4 17.3-6.4 23.4 0 4.5 1.1 8.4 3.1 11.8 2.2 3.3 7.5 8.1 15.9 14.2l10.6 6.9c11.3 9.8 17.3 16.6 17.3 20.6 0 2.1-1 4.2-4 6.5-2 2.4-4.7 3.6-7 3.6-.2 0-.3.2-.3.7 0 .1 1 2.1 3.1 6 4.2 5.7 13.2 8.5 25.2 8.5 22 0 39-9 52-27 0-5 0-8.1-1-9.4v-3.7c0-6.5 1-11.4 3-14.6s4-4.7 7-4.7c2 0 4 .7 6 2.2 1-7.7 1-14.4 1-20.4 0-9.1 0-16.6-2-23.6-1-6-3-11-5-15l-6-9c-2-3-3-6-5-9-1-4-2-7-2-12-3-5-5-10-8-15-2-5-4-10-6-14l-9 7c-10 7-18 10-25 10-6 0-11-1-14-5l-6-5c0 3-1 7-3 11l-6.3 12c-2.8 7-4.3 11-4.6 14-.4 2-.7 4-.9 4l-7.5 15c-8.1 15-12.2 28.9-12.2 40.4 0 2.3.2 4.7.6 7.1-4.5-3.1-6.7-7.4-6.7-13m71.6 94.6c-13 0-23 1.76-30 5.25v-.3c-5 6-10.6 9.1-18.4 9.1-4.9 0-12.6-1.9-23-5.7-10.5-3.6-19.8-6.36-27.9-8.18-.8-.23-2.6-.57-5.5-1.03-2.8-.45-5.4-.91-7.7-1.37-2.1-.45-4.5-1.13-7.1-2.05-2.5-.79-4.5-1.82-6-3.07-1.38-1.26-2.06-2.68-2.06-4.27 0-1.6.34-3.31 1.02-5.13.64-1.1 1.34-2.2 2.04-3.2.7-1.1 1.3-2.1 1.7-3.1.6-.9 1-1.8 1.4-2.8.4-.9.8-1.8 1-2.9.2-1 .4-2 .4-3s-.4-4-1.2-9.3c-.8-5.2-1.2-8.5-1.2-9.9 0-4.4 1-7.9 3.2-10.4s4.3-3.8 6.5-3.8h11.5c.9 0 2.3-.5 4.4-1.7.7-1.6 1.3-2.9 1.7-4.1.5-1.2.7-2.1.9-2.5.2-.6.4-1.2.6-1.7.4-.7.9-1.5 1.6-2.3-.8-1-1.2-2.3-1.2-3.9 0-1.1 0-2.1.2-2.7 0-3.6 1.7-8.7 5.3-15.4l3.5-6.3c2.9-5.4 5.1-9.4 6.7-13.4 1.7-4 3.5-10 5.5-18 1.6-7 5.4-14 11.4-21l7.5-9c5.2-6 8.6-11 10.5-15s2.9-9 2.9-13c0-2-.5-8-1.6-18-1-10-1.5-20-1.5-29 0-7 .6-12 1.9-17s3.6-10 7-14c3-4 7-8 13-10s13-3 21-3c3 0 6 0 9 1 3 0 7 1 12 3 4 2 8 4 11 7 4 3 7 8 10 13 2 6 4 12 5 20 1 5 1 10 2 17 0 6 1 10 1 13 1 3 1 7 2 12 1 4 2 8 4 11 2 4 4 8 7 12 3 5 7 10 11 16 9 10 16 21 20 32 5 10 8 23 8 36.9 0 6.9-1 13.6-3 20.1 2 0 3 .8 4 2.2s2 4.4 3 9.1l1 7.4c1 2.2 2 4.3 5 6.1 2 1.8 4 3.3 7 4.5 2 1 5 2.4 7 4.2 2 2 3 4.1 3 6.3 0 3.4-1 5.9-3 7.7-2 2-4 3.4-7 4.3-2 1-6 3-12 5.82-5 2.96-10 6.55-15 10.8l-10 8.51c-4 3.9-8 6.7-11 8.4-3 1.8-7 2.7-11 2.7l-7-.8c-8-2.1-13-6.1-16-12.2-16-1.94-29-2.9-37-2.9"/></svg>',
  };

  let currentStep = 'entry';
  let selectedOS = '';
  let selectedFramework = '';
  let knowsFile = false;
  let currentFileContent = ''; // Store file content for later use

  const scriptUrl = 'https://peekvisor.vercel.app/hello.js';
  const scriptHtml = `<script src="${scriptUrl}"></script>`;

  function renderContent() {
    switch (currentStep) {
      case 'entry':
        return renderEntryScreen();
      case 'manual':
        return renderManualInstallation();
      case 'automatic':
        return renderAutomaticWizard();
      case 'os-selection':
        return renderOSSelection();
      case 'framework-selection':
        return renderFrameworkSelection();
      case 'file-knowledge':
        return renderFileKnowledge();
      case 'file-input':
        return renderFileInput();
      case 'tree-input':
        return renderTreeInput();
      case 'final-instructions':
        return renderFinalInstructions();
      default:
        return renderEntryScreen();
    }
  }

  function renderEntryScreen() {
    return `
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <svg class="h-6 w-6 text-neutral-800 dark:text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                ${t('websites.wizard.title')} - ${data.website.name}
              </h3>
              <div class="flex items-center gap-2 mt-1">
                <div id="status-indicator" class="h-2 w-2 rounded-full bg-gray-400"></div>
                <span id="status-text" class="text-xs text-neutral-500 dark:text-neutral-400">${t('websites.wizard.checkingStatus')}</span>
                <button id="recheck-btn" class="text-xs text-blue-600 dark:text-blue-400 hover:underline ml-2">${t('websites.wizard.recheck')}</button>
              </div>
            </div>
          </div>
          <button class="close-modal rounded-xl p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-300">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-6">
          <div class="text-center mb-8">
            <h4 class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              ${t('websites.wizard.chooseMethod')}
            </h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              ${t('websites.wizard.chooseMethodDesc')}
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button id="automatic-btn" class="install-option-btn p-6 border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 rounded-xl transition-all hover:scale-105">
              <div class="flex items-center gap-4 mb-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700">
                  <svg class="h-5 w-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div class="text-left">
                  <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    ${t('websites.wizard.recommended')}
                  </span>
                </div>
              </div>
              <div class="text-left">
                <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  ${t('websites.wizard.automatic')}
                </h5>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  ${t('websites.wizard.automaticDesc')}
                </p>
              </div>
            </button>
            
            <button id="manual-btn" class="install-option-btn p-6 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl transition-all hover:scale-105 hover:border-neutral-300 dark:hover:border-neutral-500">
              <div class="flex items-center gap-4 mb-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700">
                  <svg class="h-5 w-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
              <div class="text-left">
                <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  ${t('websites.wizard.manual')}
                </h5>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  ${t('websites.wizard.manualDesc')}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderManualInstallation() {
    const encodedScript = scriptHtml.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <button id="back-btn" class="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
              <svg class="h-5 w-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                ${t('websites.wizard.manual')}
              </h3>
              <p class="text-sm text-neutral-500 dark:text-neutral-400">${data.website.name}</p>
            </div>
          </div>
          <button class="close-modal rounded-xl p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-300">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-6">
          <div>
            <label class="block text-base font-medium text-neutral-700 dark:text-neutral-300 mb-4">
              ${t('websites.wizard.trackingScript')}
            </label>
            <div class="bg-neutral-800 dark:bg-neutral-900 p-4 rounded-lg flex items-center justify-between">
            <code class="text-[#75BFFE] text-sm flex-1">${encodedScript}</code>
            <button class="copy-btn ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700" data-copy-raw="true">
              Copy
            </button>
          </div>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <div class="flex items-start gap-4">
              <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 flex-shrink-0 mt-1">
                <svg class="h-4 w-4 text-neutral-800 dark:text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-neutral-800 dark:text-neutral-200 mb-3 text-base">
                  ${t('websites.wizard.installSteps')}
                </h4>
                <ol class="text-sm text-neutral-800 dark:text-neutral-200 space-y-2 list-decimal list-inside">
                  <li>${t('websites.wizard.step1Copy')}</li>
                  <li>Paste it in your website's &lt;head&gt; section</li>
                  <li>${t('websites.wizard.step3Deploy')}</li>
                  <li>${t('websites.wizard.step4Check')}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderAutomaticWizard() {
    return renderOSSelection();
  }

  function renderOSSelection() {
    return `
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <button id="back-btn" class="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
              <svg class="h-5 w-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                ${t('websites.wizard.automatic')}
              </h3>
              <p class="text-sm text-neutral-500 dark:text-neutral-400">${t('websites.wizard.step1of3')}</p>
            </div>
          </div>
          <button class="close-modal rounded-xl p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-300">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-6">
          <div class="text-center mb-8">
            <h4 class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              ${t('websites.wizard.selectOS')}
            </h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              ${t('websites.wizard.selectOSDesc')}
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button class="os-btn p-6 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl transition-all hover:scale-105 hover:border-blue-400 dark:hover:border-blue-400" data-os="Windows">
              <div class="flex flex-col items-center gap-3">
                <div class="text-neutral-700 dark:text-neutral-300">
                  ${osIcons.Windows}
                </div>
                <span class="font-medium text-neutral-900 dark:text-neutral-100">Windows</span>
              </div>
            </button>
            
            <button class="os-btn p-6 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl transition-all hover:scale-105 hover:border-blue-400 dark:hover:border-blue-400" data-os="macOS">
              <div class="flex flex-col items-center gap-3">
                <div class="text-neutral-700 dark:text-neutral-300">
                  ${osIcons.macOS}
                </div>
                <span class="font-medium text-neutral-900 dark:text-neutral-100">macOS</span>
              </div>
            </button>
            
            <button class="os-btn p-6 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl transition-all hover:scale-105 hover:border-blue-400 dark:hover:border-blue-400" data-os="Linux">
              <div class="flex flex-col items-center gap-3">
                <div class="text-neutral-700 dark:text-neutral-300">
                  ${osIcons.Linux}
                </div>
                <span class="font-medium text-neutral-900 dark:text-neutral-100">Linux</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderFrameworkSelection() {
    return `
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <button id="back-btn" class="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
              <svg class="h-5 w-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                ${t('websites.wizard.automatic')}
              </h3>
              <p class="text-sm text-neutral-500 dark:text-neutral-400">${t('websites.wizard.step2of3')}</p>
            </div>
          </div>
          <button class="close-modal rounded-xl p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-300">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-6">
          <div class="text-center mb-8">
            <h4 class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              ${t('websites.wizard.selectFramework')}
            </h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              ${t('websites.wizard.selectFrameworkDesc')}
            </p>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            ${['HTML', 'React', 'Astro', 'Next.js', 'Vue', 'Vanilla JS',  'Svelte', 'SvelteKit', 'SolidJS', 'Qwik', 'Lit', 'Other'].map(framework => `
              <button class="framework-btn p-4 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl transition-all hover:scale-105 hover:border-blue-400 dark:hover:border-blue-400 text-sm font-medium text-neutral-900 dark:text-neutral-100" data-framework="${framework}">
                ${framework}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderFileKnowledge() {
    return `
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <button id="back-btn" class="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
              <svg class="h-5 w-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                ${t('websites.wizard.automatic')}
              </h3>
              <p class="text-sm text-neutral-500 dark:text-neutral-400">${t('websites.wizard.step3of3')}</p>
            </div>
          </div>
          <button class="close-modal rounded-xl p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-300">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-6">
          <div class="text-center mb-8">
            <h4 class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              ${t('websites.wizard.fileLocation')}
            </h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              ${t('websites.wizard.fileLocationDesc')}
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button id="knows-file-yes" class="p-6 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl transition-all hover:scale-105 hover:border-blue-400 dark:hover:border-blue-400">
              <div class="flex items-center gap-4">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
                  <svg class="h-5 w-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div class="text-left">
                  <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">${t('websites.wizard.yesKnowFile')}</h5>
                  <p class="text-sm text-neutral-600 dark:text-neutral-400">${t('websites.wizard.yesKnowFileDesc')}</p>
                </div>
              </div>
            </button>
            
            <button id="knows-file-no" class="p-6 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl transition-all hover:scale-105 hover:border-blue-400 dark:hover:border-blue-400">
              <div class="flex items-center gap-4">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/50">
                  <svg class="h-5 w-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="text-left">
                  <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">${t('websites.wizard.noHelpFind')}</h5>
                  <p class="text-sm text-neutral-600 dark:text-neutral-400">${t('websites.wizard.noHelpFindDesc')}</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderFileInput() {
    return `
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <button id="back-btn" class="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
              <svg class="h-5 w-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                ${t('websites.wizard.fileContentAnalysis')}
              </h3>
              <p class="text-sm text-neutral-500 dark:text-neutral-400">${t('websites.wizard.fileContentAnalysis')}</p>
            </div>
          </div>
          <button class="close-modal rounded-xl p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-300">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-6">
          <div>
            <label class="block text-base font-medium text-neutral-700 dark:text-neutral-300 mb-4">
              ${t('websites.wizard.pasteFileContent')}
            </label>
            <textarea 
              id="file-content" 
              placeholder="${t('websites.wizard.pasteFilePlaceholder')}"
              class="w-full h-64 p-4 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-neutral-50 dark:bg-neutral-700 text-sm font-mono resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:text-neutral-100"
            ></textarea>
          </div>
          
          <div class="flex justify-between">
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              ${t('websites.wizard.selected')} ${selectedOS} • ${selectedFramework}
            </div>
            <button id="analyze-file-btn" class="rounded-xl bg-black dark:bg-white dark:text-black px-6 py-3 text-white transition-all duration-200 hover:bg-blue-700 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="wand-icon">
                <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/>
                <path d="m14 7 3 3"/>
                <path d="M5 6v4"/>
                <path d="M19 14v4"/>
                <path d="M10 2v2"/>
                <path d="M7 8H3"/>
                <path d="M21 16h-4"/>
                <path d="M11 3H9"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spinner-icon hidden">
                <path class="loader-bar loader-bar-1" d="M12 2v4"/>
                <path class="loader-bar loader-bar-2" d="m16.2 7.8 2.9-2.9"/>
                <path class="loader-bar loader-bar-3" d="M18 12h4"/>
                <path class="loader-bar loader-bar-4" d="m16.2 16.2 2.9 2.9"/>
                <path class="loader-bar loader-bar-5" d="M12 18v4"/>
                <path class="loader-bar loader-bar-6" d="m4.9 19.1 2.9-2.9"/>
                <path class="loader-bar loader-bar-7" d="M2 12h4"/>
                <path class="loader-bar loader-bar-8" d="m4.9 4.9 2.9 2.9"/>
              </svg>
              ${t('websites.wizard.analyzeFile')}
            </button>
          </div>
          
          <div id="analysis-result" class="hidden"></div>
        </div>
      </div>
    `;
  }

  function renderTreeInput() {
    const getTreeCommand = () => {
      switch (selectedFramework.toLowerCase()) {
        case 'flask':
        case 'django':
          return `tree -I "__pycache__|.venv|venv|env|.env|dist|build|migrations|.pytest_cache|.git"`;
        case 'laravel':
          return `tree -I "vendor|storage|node_modules|dist|build|.git"`;
        case 'rails':
          return `tree -I "vendor|log|tmp|node_modules|dist|build|.git"`;
        default:
          return `tree -I "node_modules|dist|.next|out|build|.turbo|.cache|.git"`;
      }
    };

    const getTreeInstallCommand = () => {
      switch (selectedOS) {
        case 'macOS':
          return 'brew install tree';
        case 'Linux':
          return 'sudo apt-get install tree  # or sudo yum install tree';
        case 'Windows':
          return t('websites.wizard.availableVia');
        default:
          return 'Install tree command for your system';
      }
    };

    return `
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <button id="back-btn" class="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
              <svg class="h-5 w-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
           </button>
           <div>
             <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
               ${t('websites.wizard.projectStructure')}
             </h3>
             <p class="text-sm text-neutral-500 dark:text-neutral-400">${t('websites.wizard.generateTree')}</p>
           </div>
         </div>
         <button class="close-modal rounded-xl p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-300">
           <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
           </svg>
         </button>
       </div>
       
       <div class="space-y-6">
         <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
           <h4 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">${t('websites.wizard.installTree')}</h4>
           <div class="bg-neutral-800 dark:bg-neutral-900 p-4 rounded-lg mb-4">
             <code class="text-[#75BFFE] text-sm">${getTreeInstallCommand()}</code>
           </div>
           
           <h4 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">${t('websites.wizard.generateProjectTree')}</h4>
           <p class="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
             ${t('websites.wizard.runFromRoot')}
           </p>
           <div class="bg-neutral-800 dark:bg-neutral-900 p-4 rounded-lg flex items-center justify-between">
             <code class="text-[#75BFFE] text-sm flex-1">${getTreeCommand()}</code>
             <button class="copy-tree-cmd ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700" data-tree-command="true">
               Copy
             </button>
           </div>
         </div>
         
         <div>
           <label class="block text-base font-medium text-neutral-700 dark:text-neutral-300 mb-4">
             ${t('websites.wizard.pasteTreePlaceholder')}
           </label>
           <textarea 
             id="tree-content" 
             placeholder="${t('websites.wizard.pasteTreePlaceholder')}"
             class="w-full h-64 p-4 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-neutral-50 dark:bg-neutral-700 text-sm font-mono resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:text-neutral-100"
           ></textarea>
         </div>
         
         <div class="flex justify-end">
           <button id="analyze-tree-btn" class="rounded-xl bg-black dark:bg-white dark:text-black px-6 py-3 text-white transition-all duration-200 hover:bg-blue-700 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" disabled>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="wand-icon">
              <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/>
              <path d="m14 7 3 3"/>
              <path d="M5 6v4"/>
              <path d="M19 14v4"/>
              <path d="M10 2v2"/>
              <path d="M7 8H3"/>
              <path d="M21 16h-4"/>
              <path d="M11 3H9"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spinner-icon hidden">
              <path class="loader-bar loader-bar-1" d="M12 2v4"/>
              <path class="loader-bar loader-bar-2" d="m16.2 7.8 2.9-2.9"/>
              <path class="loader-bar loader-bar-3" d="M18 12h4"/>
              <path class="loader-bar loader-bar-4" d="m16.2 16.2 2.9 2.9"/>
              <path class="loader-bar loader-bar-5" d="M12 18v4"/>
              <path class="loader-bar loader-bar-6" d="m4.9 19.1 2.9-2.9"/>
              <path class="loader-bar loader-bar-7" d="M2 12h4"/>
              <path class="loader-bar loader-bar-8" d="m4.9 4.9 2.9 2.9"/>
            </svg>
            ${t('websites.wizard.analyzeStructure')}
          </button>
         </div>
         
         <div id="tree-analysis-result" class="hidden"></div>
       </div>
     </div>
   `;
 }

 function renderFinalInstructions() {
  const escapeHtml = (text: string) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  return `
    <div class="p-8">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <button id="back-btn" class="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
            <svg class="h-5 w-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              ${t('websites.wizard.finalInstructions')}
            </h3>
            <p class="text-sm text-neutral-500 dark:text-neutral-400">${t('websites.wizard.followSteps')}</p>
          </div>
        </div>
        <button class="close-modal rounded-xl p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-300">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="space-y-6">
        <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
          <h4 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            <svg class="inline-block w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ${t('websites.wizard.locationFound')}
          </h4>
          ${(window as any).recommendedFile ? `
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
            ${t('websites.wizard.file')} <code class="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">${(window as any).recommendedFile}</code>
          </p>
        ` : ''}
          
          <div class="space-y-4">
            <div>
              <p class="text-sm text-neutral-700 dark:text-neutral-300 mb-2">${t('websites.wizard.findLine')}</p>
              <div class="bg-neutral-800 dark:bg-neutral-900 p-4 rounded-lg">
                <code class="text-[#75BFFE] text-sm" id="anchor-line-display">${escapeHtml((window as any).lastAnalysisResult?.anchorLine || '</head>')}</code>
              </div>
            </div>
            
            <div>
              <p class="text-sm text-neutral-700 dark:text-neutral-300 mb-2">${t('websites.wizard.addScript')}</p>
              <div class="bg-neutral-800 dark:bg-neutral-900 p-4 rounded-lg flex items-center justify-between">
                <code class="text-[#75BFFE] text-sm flex-1">${escapeHtml(scriptHtml)}</code>
                <button class="copy-script-final ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700" data-copy-raw="true">
                  Copy
                </button>
              </div>
            </div>
            
            <div>
              <p class="text-sm text-neutral-700 dark:text-neutral-300 mb-2">${t('websites.wizard.saveAndDeploy')}</p>
            </div>
          </div>
        </div>
        
        <div class="flex justify-between">
          <button id="start-over-btn" class="rounded-xl px-6 py-3 text-neutral-800 dark:text-neutral-200 bg-neutral-200 dark:bg-neutral-700 transition-all duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 hover:scale-105 active:scale-95">
            ${t('websites.wizard.startOver')}
          </button>
          <button id="recheck-final-btn" class="rounded-xl bg-blue-600 px-6 py-3 text-white transition-all duration-200 hover:bg-blue-700 hover:scale-105 active:scale-95">
            ${t('websites.wizard.recheckStatus')}
          </button>
        </div>
      </div>
    </div>
  `;
}

 function initializeEventListeners() {
    // Store analysis results globally for the modal
    (window as any).lastAnalysisResult = null;
    (window as any).recommendedFile = null;
    const closeBtn = modalContent.querySelector('.close-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.remove();
      });
    }

    const getTreeCommand = () => {
      switch (selectedFramework.toLowerCase()) {
        case 'flask':
        case 'django':
          return 'tree -I "__pycache__|.venv|venv|env|.env|dist|build|migrations|.pytest_cache|.git"';
        case 'laravel':
          return 'tree -I "vendor|storage|node_modules|dist|build|.git"';
        case 'rails':
          return 'tree -I "vendor|log|tmp|node_modules|dist|build|.git"';
        default:
          return 'tree -I "node_modules|dist|.next|out|build|.turbo|.cache|.git"';
      }
    };

    const automaticBtn = modalContent.querySelector('#automatic-btn');
    if (automaticBtn) {
      automaticBtn.addEventListener('click', () => {
        currentStep = 'os-selection';
        modalContent.innerHTML = renderContent();
        initializeEventListeners();
      });
    }

    const manualBtn = modalContent.querySelector('#manual-btn');
    if (manualBtn) {
      manualBtn.addEventListener('click', () => {
        currentStep = 'manual';
        modalContent.innerHTML = renderContent();
        initializeEventListeners();
      });
    }

    const backBtn = modalContent.querySelector('#back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (currentStep === 'manual' || currentStep === 'os-selection') {
          currentStep = 'entry';
        } else if (currentStep === 'framework-selection') {
          currentStep = 'os-selection';
        } else if (currentStep === 'file-knowledge') {
          currentStep = 'framework-selection';
        } else if (currentStep === 'file-input' || currentStep === 'tree-input') {
          currentStep = 'file-knowledge';
        } else if (currentStep === 'final-instructions') {
          currentStep = knowsFile ? 'file-input' : 'tree-input';
        }
        modalContent.innerHTML = renderContent();
        initializeEventListeners();
        if (currentStep === 'entry') {
          checkInstallationStatus();
        }
      });
    }

    const osBtns = modalContent.querySelectorAll('.os-btn');
    osBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedOS = btn.getAttribute('data-os') || '';
        currentStep = 'framework-selection';
        modalContent.innerHTML = renderContent();
        initializeEventListeners();
      });
    });

    const frameworkBtns = modalContent.querySelectorAll('.framework-btn');
    frameworkBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedFramework = btn.getAttribute('data-framework') || '';
        currentStep = 'file-knowledge';
        modalContent.innerHTML = renderContent();
        initializeEventListeners();
      });
    });

    const knowsFileYes = modalContent.querySelector('#knows-file-yes');
    if (knowsFileYes) {
      knowsFileYes.addEventListener('click', () => {
        knowsFile = true;
        currentStep = 'file-input';
        modalContent.innerHTML = renderContent();
        initializeEventListeners();
      });
    }

    const knowsFileNo = modalContent.querySelector('#knows-file-no');
    if (knowsFileNo) {
      knowsFileNo.addEventListener('click', () => {
        knowsFile = false;
        currentStep = 'tree-input';
        modalContent.innerHTML = renderContent();
        initializeEventListeners();
      });
    }

    const recheckBtn = modalContent.querySelector('#recheck-btn');
    if (recheckBtn) {
      recheckBtn.addEventListener('click', () => {
        checkInstallationStatus();
      });
    }

    const recheckManualBtn = modalContent.querySelector('#recheck-manual-btn');
    if (recheckManualBtn) {
      recheckManualBtn.addEventListener('click', () => {
        checkInstallationStatus();
      });
    }

    const recheckFinalBtn = modalContent.querySelector('#recheck-final-btn');
    if (recheckFinalBtn) {
      recheckFinalBtn.addEventListener('click', () => {
        checkInstallationStatus();
      });
    }

    const startOverBtn = modalContent.querySelector('#start-over-btn');
    if (startOverBtn) {
      startOverBtn.addEventListener('click', () => {
        currentStep = 'entry';
        selectedOS = '';
        selectedFramework = '';
        knowsFile = false;
        currentFileContent = '';
        (window as any).lastAnalysisResult = null;
        modalContent.innerHTML = renderContent();
        initializeEventListeners();
        checkInstallationStatus();
      });
    }

    const copyBtn = modalContent.querySelector('.copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(scriptHtml).then(() => {
          const originalText = copyBtn.innerHTML;
          copyBtn.textContent = t('websites.wizard.copied');
          setTimeout(() => {
            copyBtn.textContent = t('websites.wizard.copy');
          }, 2000);
        });
      });
    }

    const copyScriptFinal = modalContent.querySelector('.copy-script-final');
    if (copyScriptFinal) {
      copyScriptFinal.addEventListener('click', () => {
        navigator.clipboard.writeText(scriptHtml).then(() => {
          copyScriptFinal.textContent = 'Copied!';
          setTimeout(() => {
            copyScriptFinal.textContent = 'Copy';
          }, 2000);
        });
      });
    }

    const copyTreeCmd = modalContent.querySelector('.copy-tree-cmd');
    if (copyTreeCmd) {
      copyTreeCmd.addEventListener('click', () => {
        const command = getTreeCommand();
        navigator.clipboard.writeText(command).then(() => {
          copyTreeCmd.textContent = 'Copied!';
          setTimeout(() => {
            copyTreeCmd.textContent = 'Copy';
          }, 2000);
        });
      });
    }

   const fileContent = modalContent.querySelector('#file-content') as HTMLTextAreaElement;
    const analyzeFileBtn = modalContent.querySelector('#analyze-file-btn') as HTMLButtonElement;
    if (fileContent && analyzeFileBtn) {
      fileContent.addEventListener('input', () => {
        analyzeFileBtn.disabled = !fileContent.value.trim();
      });
      
      analyzeFileBtn.addEventListener('click', async () => {
        const content = fileContent.value.trim();
        if (!content) return;
        
        currentFileContent = content; // Store for later use
        analyzeFileBtn.disabled = true;
        const wandIcon = analyzeFileBtn.querySelector('.wand-icon');
        const spinnerIcon = analyzeFileBtn.querySelector('.spinner-icon');
        if (wandIcon) wandIcon.classList.add('hidden');
        if (spinnerIcon) spinnerIcon.classList.remove('hidden');
        if (analyzeFileBtn.lastChild) analyzeFileBtn.lastChild.textContent = t('websites.wizard.analyzing');
        
        try {
          const response = await fetch('https://peekvisor-troubleshooter.vercel.app/analyze-file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              content: content,
              framework: selectedFramework,
              os: selectedOS
            })
          });
          
          if (response.ok) {
            const result = await response.json();
            (window as any).lastAnalysisResult = result; // Store result globally
            
            // Navigate directly to final instructions
            currentStep = 'final-instructions';
            modalContent.innerHTML = renderContent();
            initializeEventListeners();
          } else {
            throw new Error('Analysis failed');
          }
        } catch (error) {
          console.error('Analysis Failed', error);
          // Show error message but still allow proceeding with defaults
          const resultDiv = modalContent.querySelector('#analysis-result');
          if (resultDiv) {
            resultDiv.classList.remove('hidden');
            resultDiv.innerHTML = `
              <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
                <h4 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">${t('websites.wizard.analysisComplete')}</h4>
                <p class="text-sm text-neutral-700 dark:text-neutral-300">
                  We'll use the default location for your ${selectedFramework} project.
                </p>
                <button id="proceed-with-defaults" class="mt-3 rounded-xl bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700">
                  ${t('websites.wizard.continueInstructions')}
                </button>
              </div>
            `;
            
            // Add event listener for proceeding with defaults
            const proceedBtn = modalContent.querySelector('#proceed-with-defaults');
            if (proceedBtn) {
              proceedBtn.addEventListener('click', () => {
                (window as any).lastAnalysisResult = {
                  anchorLine: '</head>',
                  snippet: scriptHtml
                };
                currentStep = 'final-instructions';
                modalContent.innerHTML = renderContent();
                initializeEventListeners();
              });
            }
          }
          analyzeFileBtn.disabled = false;
          const wandIcon = analyzeFileBtn.querySelector('.wand-icon');
          const spinnerIcon = analyzeFileBtn.querySelector('.spinner-icon');
          if (wandIcon) wandIcon.classList.remove('hidden');
          if (spinnerIcon) spinnerIcon.classList.add('hidden');
          if (analyzeFileBtn.lastChild) analyzeFileBtn.lastChild.textContent = t('websites.wizard.analyzeFile');
        }
      });
    }

    const treeContent = modalContent.querySelector('#tree-content') as HTMLTextAreaElement;
    const analyzeTreeBtn = modalContent.querySelector('#analyze-tree-btn') as HTMLButtonElement;
    if (treeContent && analyzeTreeBtn) {
      treeContent.addEventListener('input', () => {
        analyzeTreeBtn.disabled = !treeContent.value.trim();
      });
      
      analyzeTreeBtn.addEventListener('click', async () => {
        const content = treeContent.value.trim();
        if (!content) return;
        
        analyzeTreeBtn.disabled = true;
        analyzeTreeBtn.disabled = true;
        const wandIcon = analyzeTreeBtn.querySelector('.wand-icon');
        const spinnerIcon = analyzeTreeBtn.querySelector('.spinner-icon');
        if (wandIcon) wandIcon.classList.add('hidden');
        if (spinnerIcon) spinnerIcon.classList.remove('hidden');
        if (analyzeTreeBtn.lastChild) analyzeTreeBtn.lastChild.textContent = t('websites.wizard.analyzing');
        
        try {
          const response = await fetch('https://peekvisor-troubleshooter.vercel.app/analyze-tree', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tree: content,
              framework: selectedFramework,
              os: selectedOS
            })
          });
          
          if (response.ok) {
            const result = await response.json();
            const resultDiv = modalContent.querySelector('#tree-analysis-result');
            if (resultDiv) {
              resultDiv.classList.remove('hidden');
              if (result.needsRefinement) {
                resultDiv.innerHTML = `
                  <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
                    <h4 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">${t('websites.wizard.refinementNeeded')}</h4>
                    <p class="text-sm text-neutral-700 dark:text-neutral-300 mb-3">${result.message || t('websites.wizard.runCleanerCommand')}'}</p>
                    <div class="bg-neutral-800 dark:bg-neutral-900 p-4 rounded-lg">
                      <code class="text-[#75BFFE] text-sm">${result.refinedCommand}</code>
                    </div>
                  </div>
                `;
              } else {
                (window as any).recommendedFile = result.recommendedFile;
                
                resultDiv.innerHTML = `
                  <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                    <h4 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">${t('websites.wizard.fileFound')}</h4>
                    <div class="bg-neutral-800 dark:bg-neutral-900 p-4 rounded-lg mb-3">
                      <code class="text-[#75BFFE] text-sm">${result.recommendedFile}</code>
                    </div>
                    <p class="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
                      ${t('websites.wizard.pasteContentContinue')}
                    </p>
                  </div>
                `;
                
                const fileInputSection = document.createElement('div');
                fileInputSection.className = 'mt-6';
                fileInputSection.innerHTML = `
                  <div>
                    <label class="block text-base font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                      ${t('websites.wizard.pasteContentOf')} ${result.recommendedFile}:
                    </label>
                    <textarea 
                      id="tree-file-content" 
                      placeholder="${t('websites.wizard.pasteContentOf')} ${result.recommendedFile}"
                      class="w-full h-64 p-4 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-neutral-50 dark:bg-neutral-700 text-sm font-mono resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:text-neutral-100"
                    ></textarea>
                  </div>
                  
                  <div class="flex justify-end mt-4">
                    <button id="analyze-tree-file-btn" class="rounded-xl bg-black dark:bg-white dark:text-black px-6 py-3 text-white transition-all duration-200 hover:bg-blue-700 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" disabled>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="wand-icon">
                        <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/>
                        <path d="m14 7 3 3"/>
                        <path d="M5 6v4"/>
                        <path d="M19 14v4"/>
                        <path d="M10 2v2"/>
                        <path d="M7 8H3"/>
                        <path d="M21 16h-4"/>
                        <path d="M11 3H9"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spinner-icon hidden">
                        <path class="loader-bar loader-bar-1" d="M12 2v4"/>
                        <path class="loader-bar loader-bar-2" d="m16.2 7.8 2.9-2.9"/>
                        <path class="loader-bar loader-bar-3" d="M18 12h4"/>
                        <path class="loader-bar loader-bar-4" d="m16.2 16.2 2.9 2.9"/>
                        <path class="loader-bar loader-bar-5" d="M12 18v4"/>
                        <path class="loader-bar loader-bar-6" d="m4.9 19.1 2.9-2.9"/>
                        <path class="loader-bar loader-bar-7" d="M2 12h4"/>
                        <path class="loader-bar loader-bar-8" d="m4.9 4.9 2.9 2.9"/>
                      </svg>
                      ${t('websites.wizard.analyzeFileContent')}
                    </button>
                  </div>
                `;
                
                resultDiv.parentElement?.appendChild(fileInputSection);
                
                const treeFileContent = modalContent.querySelector('#tree-file-content') as HTMLTextAreaElement;
                const analyzeTreeFileBtn = modalContent.querySelector('#analyze-tree-file-btn') as HTMLButtonElement;
                
                if (treeFileContent && analyzeTreeFileBtn) {
                  treeFileContent.addEventListener('input', () => {
                    analyzeTreeFileBtn.disabled = !treeFileContent.value.trim();
                  });
                  
                  analyzeTreeFileBtn.addEventListener('click', async () => {
                    const content = treeFileContent.value.trim();
                    if (!content) return;
                    
                    analyzeTreeFileBtn.disabled = true;
                    const wandIcon = analyzeTreeFileBtn.querySelector('.wand-icon');
                    const spinnerIcon = analyzeTreeFileBtn.querySelector('.spinner-icon');
                    if (wandIcon) wandIcon.classList.add('hidden');
                    if (spinnerIcon) spinnerIcon.classList.remove('hidden');
                    if (analyzeTreeFileBtn.lastChild) analyzeTreeFileBtn.lastChild.textContent = t('websites.wizard.analyzing');
                    
                    try {
                      const response = await fetch('https://peekvisor-troubleshooter.vercel.app/analyze-file', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          content: content,
                          framework: selectedFramework,
                          os: selectedOS
                        })
                      });
                      
                      if (response.ok) {
                        const fileResult = await response.json();
                        (window as any).lastAnalysisResult = fileResult;
                        currentStep = 'final-instructions';
                        modalContent.innerHTML = renderContent();
                        initializeEventListeners();
                      } else {
                        throw new Error('Analysis failed');
                      }
                    } catch (error) {
                      console.error("Analysis Error"), error;
                      analyzeTreeFileBtn.disabled = false;
                      const wandIcon = analyzeTreeFileBtn.querySelector('.wand-icon');
                      const spinnerIcon = analyzeTreeFileBtn.querySelector('.spinner-icon');
                      if (wandIcon) wandIcon.classList.remove('hidden');
                      if (spinnerIcon) spinnerIcon.classList.add('hidden');
                      if (analyzeTreeFileBtn.lastChild) analyzeTreeFileBtn.lastChild.textContent = t('websites.wizard.analyzeFileContent');
                      alert('Failed Analysis');
                    }
                  });
                }
                
                treeContent.style.display = 'none';
                analyzeTreeBtn.style.display = 'none';
              }
            }
          }
        } catch (error) {
          console.error('Analysis Error', error);
          const resultDiv = modalContent.querySelector('#tree-analysis-result');
          if (resultDiv) {
            resultDiv.classList.remove('hidden');
            resultDiv.innerHTML = `
              <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
                <h4 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">${t('websites.wizard.analysisError')}</h4>
                <p class="text-sm text-neutral-700 dark:text-neutral-300">
                  ${t('websites.wizard.couldNotAnalyze')}
                </p>
              </div>
            `;
          }
        } finally {
          analyzeTreeBtn.disabled = false;
          const wandIcon = analyzeTreeBtn.querySelector('.wand-icon');
          const spinnerIcon = analyzeTreeBtn.querySelector('.spinner-icon');
          if (wandIcon) wandIcon.classList.remove('hidden');
          if (spinnerIcon) spinnerIcon.classList.add('hidden');
          if (analyzeTreeBtn.lastChild) analyzeTreeBtn.lastChild.textContent = t('websites.wizard.analyzeStructure');
        }
      });
    }
  }


async function checkInstallationStatus() {
    const statusIndicator = modalContent.querySelector('#status-indicator');
    const statusText = modalContent.querySelector('#status-text');
    
    if (!statusIndicator || !statusText) return;
    
    statusText.textContent = 'Checking status...';
    statusIndicator.className = 'h-2 w-2 rounded-full bg-gray-400';
    
    try {
      const response = await fetch('https://peekvisor-troubleshooter.vercel.app/api/check-installation-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ websiteId: data.website.id })
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.status === 'green') {
          statusIndicator.className = 'h-2 w-2 rounded-full bg-[#45C379]';
          statusText.textContent = t('websites.wizard.statusInstalled');
        } else if (result.status === 'yellow') {
          statusIndicator.className = 'h-2 w-2 rounded-full bg-[#AE8D3E]';
          statusText.textContent = t('websites.wizard.statusInstalledNoData');
        } else {
          statusIndicator.className = 'h-2 w-2 rounded-full bg-[#FF0000]';
          statusText.textContent = t('websites.wizard.statusNotInstalled');
        }
      }
    } catch (error) {
      console.error('Status check error:', error);
      statusIndicator.className = 'h-2 w-2 rounded-full bg-gray-400';
      statusText.textContent = 'Status check failed';
    }
  }

  modalContent.innerHTML = renderContent();
  initializeEventListeners();
  checkInstallationStatus();
  modal.appendChild(modalContent);

  return modal;
}