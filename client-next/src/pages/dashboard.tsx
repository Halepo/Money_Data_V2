import {
  Activity,
  CreditCard,
  DollarSign,
  Download,
  Users,
} from 'lucide-react';
import { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarDateRangePicker } from '@/components/ui/date-range-picker';
import { MainNav } from '@/components/ui/main-nav';
import { Search } from '@/components/ui/search';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserNav } from '@/components/ui/user-nav';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Example dashboard app using the components.',
};

import {
  UilAngleDoubleLeft,
  UilAngleDoubleRight,
  UilBill,
  UilGraphBar,
  UilHouseUser,
  UilMoneyBill,
  UilSlidersVAlt,
  UilUserSquare,
} from '@iconscout/react-unicons';
import {} from '@iconscout/react-unicons';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useUI from '@/lib/hooks/useUI';

const sidebarItems = [
  { name: 'home', icon: <UilHouseUser /> },
  { name: 'transactions', icon: <UilBill /> },
  { name: 'accounts', icon: <UilUserSquare /> },
  { name: 'budget', icon: <UilMoneyBill /> },
  { name: 'statistics', icon: <UilGraphBar /> },
  { name: 'settings', icon: <UilSlidersVAlt /> },
];

const SideBarLink = ({ item }: any) => {
  const { isSidebarExpanded } = useUI();
  const router = useRouter();
  return (
    <Link
      className='w-full space-y-2 p-2'
      href={router.basePath + item.name}
      key={item.name}
    >
      <Button variant='outline' className='d-flex w-full'>
        {item.icon}
        {isSidebarExpanded
          ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
          : ''}
      </Button>
    </Link>
  );
};

const SideBar = () => {
  const { isSidebarExpanded, sidebarWidth, toggleSidebarExpanded } = useUI();

  const toggleDrawer = () => toggleSidebarExpanded();

  return (
    <div
      className='sidebar-wrapper fixed h-full'
      style={{ minWidth: sidebarWidth }}
    >
      <div className='sidebar-title-container center items-center justify-center'>
        <button onClick={toggleDrawer} className='btn expand-sidebar-button'>
          {isSidebarExpanded ? (
            <UilAngleDoubleLeft width='4rem' height='2rem' />
          ) : (
            <UilAngleDoubleRight width='4rem' height='2rem' />
          )}
        </button>
        <p className='font-weight-bolder'>Money Data</p>
      </div>
      <hr />
      <nav className='flex flex-col items-center justify-center'>
        {sidebarItems.map((item, index) => {
          return <SideBarLink item={item} key={index} />;
        })}
      </nav>
    </div>
  );
};

export default function DashboardPage() {
  const { sidebarWidth } = useUI();
  return (
    <div className=''>
      <SideBar />
      <div
        className='radius-md hidden flex-col bg-white shadow md:flex'
        style={{ marginLeft: sidebarWidth }}
      >
        {/* header  start */}
        <header className='sticky top-0 border-b bg-white'>
          <div className='flex h-16 items-center px-4'>
            <MainNav className='mx-6' />
            <div className='ml-auto flex items-center space-x-4'>
              <Search />
              <UserNav />
            </div>
          </div>
        </header>
        {/* header  end */}
        {/* body start */}
        <main className='container flex-1 space-y-4 p-8 pt-6'>
          {/* content head start */}
          <div className='flex items-center justify-between space-y-2'>
            <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
            <div className='flex items-center space-x-2'>
              <CalendarDateRangePicker />
              <Button size='sm'>
                <Download className='mr-2 h-4 w-4' />
                Download
              </Button>
            </div>
          </div>
          {/* content head end */}
          <div className='content'>
            <Tabs defaultValue='overview' className='space-y-4'>
              <TabsList>
                <TabsTrigger value='overview'>Overview</TabsTrigger>
                <TabsTrigger value='analytics'>
                  Analytics
                </TabsTrigger>
                <TabsTrigger value='reports'>
                  Reports
                </TabsTrigger>
                <TabsTrigger value='notifications'>
                  Notifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value='overview' className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Total Revenue
                      </CardTitle>
                      <DollarSign className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>$45,231.89</div>
                      <p className='text-xs text-muted-foreground'>
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Subscriptions
                      </CardTitle>
                      <Users className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>+2350</div>
                      <p className='text-xs text-muted-foreground'>
                        +180.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Sales
                      </CardTitle>
                      <CreditCard className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>+12,234</div>
                      <p className='text-xs text-muted-foreground'>
                        +19% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Active Now
                      </CardTitle>
                      <Activity className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>+573</div>
                      <p className='text-xs text-muted-foreground'>
                        +201 since last hour
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                  <Card className='col-span-4'>
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className='pl-2'>chart</CardContent>
                  </Card>
                  <Card className='col-span-3'>
                    <CardHeader>
                      <CardTitle>Recent Sales</CardTitle>
                      <CardDescription>
                        You made 265 sales this month.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>recent sales</CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className='content'>
            <Tabs defaultValue='overview' className='space-y-4'>
              <TabsList>
                <TabsTrigger value='overview'>Overview</TabsTrigger>
                <TabsTrigger value='analytics' disabled>
                  Analytics
                </TabsTrigger>
                <TabsTrigger value='reports' disabled>
                  Reports
                </TabsTrigger>
                <TabsTrigger value='notifications' disabled>
                  Notifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value='overview' className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Total Revenue
                      </CardTitle>
                      <DollarSign className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>$45,231.89</div>
                      <p className='text-xs text-muted-foreground'>
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Subscriptions
                      </CardTitle>
                      <Users className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>+2350</div>
                      <p className='text-xs text-muted-foreground'>
                        +180.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Sales
                      </CardTitle>
                      <CreditCard className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>+12,234</div>
                      <p className='text-xs text-muted-foreground'>
                        +19% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Active Now
                      </CardTitle>
                      <Activity className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>+573</div>
                      <p className='text-xs text-muted-foreground'>
                        +201 since last hour
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                  <Card className='col-span-4'>
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className='pl-2'>chart</CardContent>
                  </Card>
                  <Card className='col-span-3'>
                    <CardHeader>
                      <CardTitle>Recent Sales</CardTitle>
                      <CardDescription>
                        You made 265 sales this month.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>recent sales</CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className='content'>
            <Tabs defaultValue='overview' className='space-y-4'>
              <TabsList>
                <TabsTrigger value='overview'>Overview</TabsTrigger>
                <TabsTrigger value='analytics' disabled>
                  Analytics
                </TabsTrigger>
                <TabsTrigger value='reports' disabled>
                  Reports
                </TabsTrigger>
                <TabsTrigger value='notifications' disabled>
                  Notifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value='overview' className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Total Revenue
                      </CardTitle>
                      <DollarSign className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>$45,231.89</div>
                      <p className='text-xs text-muted-foreground'>
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Subscriptions
                      </CardTitle>
                      <Users className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>+2350</div>
                      <p className='text-xs text-muted-foreground'>
                        +180.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Sales
                      </CardTitle>
                      <CreditCard className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>+12,234</div>
                      <p className='text-xs text-muted-foreground'>
                        +19% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Active Now
                      </CardTitle>
                      <Activity className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>+573</div>
                      <p className='text-xs text-muted-foreground'>
                        +201 since last hour
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                  <Card className='col-span-4'>
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className='pl-2'>chart</CardContent>
                  </Card>
                  <Card className='col-span-3'>
                    <CardHeader>
                      <CardTitle>Recent Sales</CardTitle>
                      <CardDescription>
                        You made 265 sales this month.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>recent sales</CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
