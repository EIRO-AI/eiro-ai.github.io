export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm" style={{ fontWeight: '500' }}>E</span>
            </div>
            <span style={{ fontWeight: '500' }}>eiro inc.</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>&copy; 2025 eiro inc. All rights reserved.</span>
            <button className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</button>
            <button className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}