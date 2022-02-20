export class Notification {
  constructor(
        public message: string,
        public type: 'success' | 'info' | 'error' | 'warning',
        public duration: number,
        public status: 'started' | 'active' | 'closing'
  ) {}
}
