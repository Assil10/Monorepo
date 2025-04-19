import requests
import time
import statistics
import concurrent.futures #Allows for concurrent execution of tasks using threads.
import matplotlib.pyplot as plt

# Configuration
API_URL = "http://127.0.0.1:5000/get-audio"
NUM_REQUESTS = 1000
MAX_WORKERS = 100  #The maximum number of threads to use for sending requests concurrently.

# Lists to store metrics
response_times = []
status_codes = []
successful_requests = 0
failed_requests = 0

def send_request(request_id):
    """Send a single request and return metrics"""
    start_time = time.time()
    try:
        response = requests.get(API_URL)
        end_time = time.time()
        elapsed_time = (end_time - start_time) * 1000  # Convert to milliseconds
        
        return {
            "request_id": request_id,
            "status_code": response.status_code,
            "response_time": elapsed_time,
            "content_length": len(response.content) if response.status_code == 200 else 0
        }
    except Exception as e:
        end_time = time.time()
        elapsed_time = (end_time - start_time) * 1000
        return {
            "request_id": request_id,
            "status_code": 0,
            "response_time": elapsed_time,
            "error": str(e),
            "content_length": 0
        }

def main():
    global successful_requests, failed_requests
    
    print(f"Starting performance test with {NUM_REQUESTS} requests to {API_URL}")
    print(f"Using {MAX_WORKERS} concurrent workers\n")
    
    overall_start_time = time.time()
    # Use ThreadPoolExecutor to send concurrent requests
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        # Submit all requests
        future_to_id = {executor.submit(send_request, i): i for i in range(NUM_REQUESTS)}
        # Process results as they complete
        for future in concurrent.futures.as_completed(future_to_id):
            result = future.result()
            response_times.append(result["response_time"])
            status_codes.append(result["status_code"])
            
            if result["status_code"] == 200:
                successful_requests += 1
                print(f"Request {result['request_id']}: {result['status_code']} - {result['response_time']:.2f}ms - {result['content_length']/1024:.2f}KB")
            else:
                failed_requests += 1
                print(f"Request {result['request_id']}: Failed - {result['status_code']} - {result['response_time']:.2f}ms")
    
    overall_end_time = time.time()
    total_time = overall_end_time - overall_start_time
    
    # Calculate metrics
    if response_times:
        avg_response_time = statistics.mean(response_times)
        min_response_time = min(response_times)
        max_response_time = max(response_times)
        median_response_time = statistics.median(response_times)
        p95_response_time = sorted(response_times)[int(len(response_times) * 0.95)]
        
        # Print summary
        print("\n--- Performance Test Results ---")
        print(f"Total Requests: {NUM_REQUESTS}")
        print(f"Successful Requests: {successful_requests}")
        print(f"Failed Requests: {failed_requests}")
        print(f"Success Rate: {successful_requests/NUM_REQUESTS*100:.2f}%")
        print(f"Total Test Time: {total_time:.2f} seconds")
        print(f"Requests Per Second: {NUM_REQUESTS/total_time:.2f}")
        print("\nResponse Time Metrics (ms):")
        print(f"  Average: {avg_response_time:.2f}")
        print(f"  Minimum: {min_response_time:.2f}")
        print(f"  Maximum: {max_response_time:.2f}")
        print(f"  Median: {median_response_time:.2f}")
        print(f"  95th Percentile: {p95_response_time:.2f}")
        
        # Create a simple histogram of response times
        plt.figure(figsize=(10, 6))
        plt.hist(response_times, bins=20, alpha=0.7, color='blue')
        plt.title('Response Time Distribution')
        plt.xlabel('Response Time (ms)')
        plt.ylabel('Number of Requests')
        plt.grid(True, alpha=0.3)
        output_path = r'C:\Users\MSI\Documents\AI korpor\chatbot version 2\response_time_histogram.png'
        plt.savefig(output_path)
        print(f"\nHistogram saved as '{output_path}'")
if __name__ == "__main__":
    main()